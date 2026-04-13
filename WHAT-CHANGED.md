# What Changed

## Backend
- changed server port to `5000` by default for AWS deployment
- kept database values configurable with environment variables
- added fallback values for local development
- moved CORS to a single configurable bean using `APP_CORS_ALLOWED_ORIGIN_PATTERNS`
- removed duplicate CORS bean from `ServerApplication.java`

## Frontend
- kept local environment on `http://localhost:8080`
- changed production environment to use a placeholder replaced at Amplify build time
- changed login API call to use environment config instead of hardcoded localhost
- added `amplify.yml` for AWS Amplify deployment

## AWS files
- added `Backend/version/.env.example`
- added `AWS-DEPLOYMENT-STEPS.md`
