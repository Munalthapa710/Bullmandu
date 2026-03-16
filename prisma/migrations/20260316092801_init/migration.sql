-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "WatchlistItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "symbol" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "WatchlistItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AnalysisHistory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "symbol" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "recommendation" TEXT NOT NULL,
    "currentPrice" REAL NOT NULL,
    "predictedPrice" REAL NOT NULL,
    "expectedChange" REAL NOT NULL,
    "rupeeMove" REAL NOT NULL,
    "confidence" REAL NOT NULL,
    "timeframeLabel" TEXT NOT NULL,
    "estimatedTargetDate" DATETIME,
    "riskNote" TEXT NOT NULL,
    "simpleExplanation" TEXT NOT NULL,
    "advancedExplanation" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "AnalysisHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "LivePriceSnapshot" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "symbol" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "previousClose" REAL NOT NULL,
    "volume" REAL NOT NULL,
    "source" TEXT NOT NULL,
    "capturedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tradingDay" TEXT NOT NULL,
    "bucketLabel" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "WatchlistItem_userId_symbol_key" ON "WatchlistItem"("userId", "symbol");

-- CreateIndex
CREATE INDEX "LivePriceSnapshot_symbol_capturedAt_idx" ON "LivePriceSnapshot"("symbol", "capturedAt");

-- CreateIndex
CREATE UNIQUE INDEX "LivePriceSnapshot_symbol_tradingDay_bucketLabel_source_key" ON "LivePriceSnapshot"("symbol", "tradingDay", "bucketLabel", "source");
