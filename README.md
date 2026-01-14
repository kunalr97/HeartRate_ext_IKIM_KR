# HeartRate Extractor

A TypeScript function that extracts numeric HeartRate values from medical log strings.

## Problem Statement

**Task:** Write a function that extracts "HeartRate" values as numbers.

**Input String:**
```
LOG_01: HeartRate=72bpm; STATUS=OK | LOG_02: HeartRate= 85 ; STATUS=WARN | LOG_03: HeartRate=error; STATUS=FAIL
```

**Expected Output:** `[72, 85]`

## Solution Approach

The solution uses a regular expression to:
1. Find all `HeartRate=<value>` patterns in the input string
2. Extract the value portion after the `=` sign
3. Parse only valid numeric values (filtering out errors like "error", "N/A", etc.)
4. Return an array of numbers

### Key Features
- Handles various formats: `72bpm`, `85`, ` 90 ` (with spaces)
- Case-insensitive matching (`HeartRate`, `HEARTRATE`, `heartrate`)
- Gracefully handles invalid/non-numeric values
- Returns empty array for edge cases (empty input, no matches)

## Quick Start

### Prerequisites
- Node.js (v16 or higher recommended)
- npm

### Installation

```bash
npm install
```

### Running the Script

```bash
npm start
```

This runs the main script with the example input and displays the extracted values.

### Testing with Custom Input

You can test the function with your own input strings by passing them as a command-line argument:

```bash
npm start -- "HeartRate=100bpm; HeartRate=150; HeartRate=error"
```

**Examples:**

```bash
# Test with different values
npm start -- "HeartRate=120; HeartRate=80bpm; HeartRate=95"
# Output: [120, 80, 95]

# Test with invalid values only
npm start -- "HeartRate=error; HeartRate=N/A"
# Output: []

# Test with mixed spacing
npm start -- "HeartRate = 70 ; HeartRate=  85bpm"
# Output: [70, 85]
```

### Running Tests

```bash
npm test
```

This runs the test suite with multiple test cases covering:
- The main example from the task
- Edge cases (empty string, no valid values)
- Various input formats
- Case insensitivity

## Project Structure

```
├── src/
│   └── heartRateExtractor.ts   # Main extraction function
├── test/
│   └── heartRateExtractor.test.ts  # Test suite
├── package.json                # Project configuration
├── package-lock.json           # Locked dependency versions for reproducible builds
├── tsconfig.json               # TypeScript configuration
└── README.md                   # This file
```

## Usage Example

```typescript
import { extractHeartRates } from './src/heartRateExtractor';

const logData = "LOG_01: HeartRate=72bpm; STATUS=OK | LOG_02: HeartRate= 85 ; STATUS=WARN";
const heartRates = extractHeartRates(logData);

console.log(heartRates); // Output: [72, 85]
```

## Author

**Kunal Runwal**

Coded with AI Assistance: Claude (Anthropic)