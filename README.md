# GitHub Actions JWT generator (For RS256)
Based on: https://github.com/morzzz007/github-actions-jwt-generator. Could not be forked as secrets are not passed to forked repositories.
Modified to use the RSA SHA256 algorithm.

Do you want to send an HTTP request using HTTPie or CURL with a signed JWT token and wondering how you can create the token for a given payload and secret? Well, look no further!

## Installation
```yaml
- name: JWT Generator
  uses: robbienutland/github-actions-jwt-generator@1.0.0
```

## Usage

The required inputs are `payload` and `privateKey`. It is recommended to store the privateKey as an encrypted [environment variable.](https://help.github.com/en/articles/virtual-environments-for-github-actions#creating-and-using-secrets-encrypted-variables)

The output where the generated token is in `token`. To use it in a next step use `${{steps.<step_id>.outputs.token}}`. The token is generated with the RSA SHA256 algorithm.

### Example usage
```yaml
on: [push]

jobs:
  send:
    name: Send new version
    runs-on: ubuntu-latest
    steps:
      - name: JWT Generator
        id: jwtGenerator
        uses: robbienutland/github-actions-jwt-generator@1.0.0
        with:
          payload: '{"hello":"world"}'
          privateKey: ${{secrets.PRIVATEKEY}} # If using a JSON Key format, save the key as if it has been printed to the console (i.e. not enclosed in quotes and where newline characters are actually represented as new lines).
          expiresIn: '1h' # Seconds from now (e.g. '60 * 60' for 1 hour), or string equivalent (e.g. '1h').
      - name: DUMP Token
        run: echo ${{steps.jwtGenerator.outputs.token}}

```
