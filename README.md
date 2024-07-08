# LeetCode Recommendation Engine

This project is a recommendation engine for LeetCode problems based on a user's recent submissions. It suggests similar problems for the user to solve next, aiming to improve their skills in specific areas.

## Features

- Fetches recent submissions of a LeetCode user.
- Recommends similar problems based on Jaccard similarity.
- Displays recommendations in a user-friendly web interface.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/vishal-git21/LeetCodeRecommendationEngine.git
   ```

2. Navigate to the project directory:

   ```bash
   cd LeetCodeRecommendationEngine
   ```

3. Install the required dependencies:

   ```bash
   npm install
   ```

## Usage

1. Start the server:

   ```bash
   node index.js
   ```

2. Open your browser and navigate to:

   ```
   http://localhost:3000/recommend/<LeetCode-username>
   ```

   Replace `<LeetCode-username>` with the actual username of the LeetCode user you want to get recommendations for.

## File Structure

```
LeetCode-Recommendation-Engine/
├── index.js                # Entry point of the application
├── recommendationLogic.js  # Logic for finding similar problems
├── views/
│   ├── recommendations.ejs # Recommendations page template
```

## API Endpoints

- **GET /recommend/:username**
  - Fetches the recent submissions of the given LeetCode username and provides problem recommendations.

## Recommendations Logic

- The recommendations are based on Jaccard similarity between the solved problems and other problems available on LeetCode.

## Acknowledgements

- This project uses the [LeetAPI](https://www.npmjs.com/package/leetapi) package for fetching LeetCode submissions.
