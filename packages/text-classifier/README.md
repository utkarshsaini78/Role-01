# `@sentinel/text-classifier`

Offline English email risk scoring from plain TypeScript: deterministic URL/sender/payment rules plus bundled TF-IDF/logistic-regression weights. `createTextClassifier()` implements the shared contract. `init()` is local and requires no network, WASM, or model download.

The model was trained on the synthetic English partition of the Apache-2.0 LLM-generated phishing corpus. The rules and model are combined conservatively because the model's synthetic training distribution does not establish real-mail calibration. Labels are `safe` below 0.35, `suspicious` below 0.65, and `phishing` at or above 0.65. See [MODEL_CARD.md](./MODEL_CARD.md) for measured results and limitations.

To retrain, pass a local copy of the English CSV to `python eval/text/train_model.py <csv>`. Run runtime smoke fixtures with `node eval/text/run_eval.mjs`. No raw email corpus is bundled.
