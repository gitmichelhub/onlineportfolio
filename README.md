
**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. 

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- ElevenLabs Voice Agent API

## Voice Agent Setup

This project includes a conversational AI voice agent powered by ElevenLabs using the official React SDK. To enable voice interactions:

1. **For Public Agents (Recommended)**:
   - No API key required
   - The project is configured to use agent ID: `agent_01jynqjwg7f77aendk120trhj5`
   - You can change this in `src/config/elevenlabs.ts`

2. **For Private Agents**:
   - Visit [ElevenLabs](https://elevenlabs.io/) and create an account
   - Navigate to your profile settings to get your API key
   - Create a `.env` file in the root directory
   - Add your API key: `VITE_ELEVENLABS_API_KEY=your_api_key_here`

3. **Usage**:
   - Click the voice orb button to start/stop conversations
   - The orb will change color based on the current state:
     - Blue: Processing
     - Green: Listening
     - Purple: Speaking
     - Default: Ready

4. **Technology**:
   - Uses the official `@elevenlabs/react` SDK
   - Handles microphone access automatically
   - Real-time WebSocket communication
   - Automatic audio streaming and playback

## How can I deploy this project?

You can deploy this project on Vercel in a few simple steps:

1. Create a Vercel account at [vercel.com](https://vercel.com)
2. Install Vercel CLI: `npm i -g vercel`
3. From your project directory, run: `vercel`
4. Follow the prompts to link your GitHub repo
5. Vercel will automatically build and deploy your site

Alternatively, you can deploy through the Vercel web interface:

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Configure your project settings
4. Click "Deploy"

Vercel will automatically detect it's a Vite project and configure the build settings appropriately.

## Can I connect a custom domain to this project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

