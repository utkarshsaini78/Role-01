# `@sentinel/audio-detector`

On-device anti-spoof scoring for 16 kHz mono PCM using the MIT-licensed AASIST ONNX export. `createAudioDetector()` implements the shared `AudioDetector` contract. `init()` reads model metadata and weights from the supplied local `assetBase`; inference uses ONNX Runtime Web 1.23.2 with WASM fallback and optional WebGPU.

The model requires a 64,600-sample (~4.04 second) window and emits a result every 32,300 samples after the first full window. Output class 1 is bona fide; the package maps the softmax probability of class 0 to `scoreFake`. Confidence is reduced for silence and scores near the provisional decision threshold. The threshold has not been calibrated on this project's clips.

The upstream model has published errors under domain shift, including high EER on in-the-wild and newer deepfake benchmarks. Use the output as one risk signal only. See [MODEL_CARD.md](./MODEL_CARD.md) for provenance, benchmark context, limitations, and license files. The model is bundled at `assets/model.onnx`.
