# MIND-Z Web Preview

The Studio is designed to be continuously previewable in a normal browser.

## Deployment

The Web Preview GitHub Actions workflow builds only the dependencies required by the Studio and publishes apps/studio/dist to GitHub Pages.

Expected public URL:

https://mariajoseobicho-cmd.github.io/MIND-Z-Tool/

The repository must have GitHub Pages configured to use GitHub Actions as its publishing source. If Pages has never been enabled, this is a one-time repository setting.

## What the preview proves

The preview does not execute local-only engines such as Ollama, ComfyUI, FFmpeg or Drift inside GitHub Pages. It validates the product shell and human workflow:

- responsive web UI;
- project workflow visualization;
- approval/rejection state transitions;
- simulated artifacts and provider status;
- future configuration surfaces.

Real media generation is executed by the local/desktop runtime or connected workers; the web preview can later connect to a hosted MIND-Z Gateway.

## Build locally

    npm install
    npm run build:preview

The result is written to apps/studio/dist.
