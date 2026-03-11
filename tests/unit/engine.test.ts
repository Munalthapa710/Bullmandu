import { describe, expect, it } from "vitest";
import { analyzeStock, estimateTimeframe } from "@/lib/analysis/engine";
import { MOCK_STOCKS } from "@/lib/data/mock-market";

describe("analysis engine", () => {
  it("produces a complete recommendation payload", () => {
    const result = analyzeStock(MOCK_STOCKS[0]);
    expect(result.symbol).toBe(MOCK_STOCKS[0].symbol);
    expect(result.recommendation).toBeDefined();
    expect(result.predictedPrice).toBeGreaterThan(0);
    expect(result.predictionChart.length).toBeGreaterThan(0);
    expect(result.confidence).toBeGreaterThanOrEqual(35);
    expect(result.confidence).toBeLessThanOrEqual(91);
    expect(result.backtest.sampleSize).toBeGreaterThanOrEqual(0);
    expect(result.backtest.directionalAccuracy).toBeGreaterThan(0);
    expect(result.backtest.meanAbsoluteErrorPercent).toBeGreaterThan(0);
  });

  it("estimates timeframe buckets", () => {
    expect(estimateTimeframe(1.5, 1.2, 6).label).toBe("1-3 trading days");
    expect(estimateTimeframe(7, 0.9, 10).label).toBe("2 weeks");
    expect(estimateTimeframe(12, 0.5, 18).label).toBe("3 months");
  });

  it("keeps finite outputs for sparse or dirty histories", () => {
    const result = analyzeStock({
      symbol: "RSML",
      companyName: "Reliance Spinning Mills Limited",
      sector: "Manufacturing",
      currentPrice: 812.1,
      previousClose: 810,
      volume: 1200,
      history: []
    });

    expect(Number.isFinite(result.predictedPrice)).toBe(true);
    expect(Number.isFinite(result.rupeeMove)).toBe(true);
    expect(Number.isFinite(result.percentageMove)).toBe(true);
    expect(Number.isFinite(result.indicators.support)).toBe(true);
    expect(Number.isFinite(result.indicators.resistance)).toBe(true);
    expect(Number.isFinite(result.backtest.directionalAccuracy)).toBe(true);
    expect(result.riskNote.includes("Infinity")).toBe(false);
  });

  it("backtests trending data with measurable accuracy", () => {
    const history = Array.from({ length: 140 }, (_, index) => ({
      date: `2025-01-${String((index % 28) + 1).padStart(2, "0")}`,
      close: 100 + index * 1.4,
      volume: 1000 + index * 10
    }));

    const result = analyzeStock({
      symbol: "TEST",
      companyName: "Test Trend Corp",
      sector: "Test",
      currentPrice: history.at(-1)!.close,
      previousClose: history.at(-2)!.close,
      volume: history.at(-1)!.volume,
      history
    });

    expect(result.backtest.sampleSize).toBeGreaterThan(5);
    expect(result.backtest.directionalAccuracy).toBeGreaterThanOrEqual(60);
    expect(result.backtest.meanAbsoluteErrorPercent).toBeLessThan(15);
  });
});
