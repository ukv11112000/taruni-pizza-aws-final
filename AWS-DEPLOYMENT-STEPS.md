# Pizza App AWS Deployment Steps

## Architecture
- Frontend: AWS Amplify
- Backend: AWS Elastic Beanstalk (Java)
- Database: Amazon RDS MySQL

## 1. Push this code to Git
Upload this updated project to your GitHub repository.

## 2. Create MySQL database in RDS
Create an RDS MySQL database and save:
- endpoint
- database name
- username
- password

Example JDBC URL:
`jdbc:mysql://your-rds-endpoint:3306/pizza_db`

## 3. Deploy backend to Elastic Beanstalk
From `Backend/version`:
```bash
./mvnw clean package
```
Deploy the generated jar from `target/` using a Java Elastic Beanstalk environment.

Set these environment properties in Elastic Beanstalk:
- `PORT=5000`
- `SPRING_DATASOURCE_URL=jdbc:mysql://your-rds-endpoint:3306/pizza_db`
- `SPRING_DATASOURCE_USERNAME=admin`
- `SPRING_DATASOURCE_PASSWORD=your-password`
- `JWT_SECRET=your-secret`
- `APP_CORS_ALLOWED_ORIGIN_PATTERNS=http://localhost:4200,https://main.<your-amplify-app-id>.amplifyapp.com`

## 4. Deploy frontend to Amplify
Set the app root to:
`Frontend/pizzitalia-v`

In Amplify environment variables add:
- `API_BASE_URL=https://your-backend-url.elasticbeanstalk.com`

Amplify will use `amplify.yml` and replace the production API URL automatically during build.

## 5. Test
Check:
- register
- login
- pizza list
- place order
- admin screens

## Important files updated
- `Backend/version/src/main/resources/application.properties`
- `Backend/version/src/main/java/com/example/demo/config/CorsConfig.java`
- `Backend/version/src/main/java/com/example/demo/ServerApplication.java`
- `Frontend/pizzitalia-v/src/environments/environment.ts`
- `Frontend/pizzitalia-v/src/environments/environment.prod.ts`
- `Frontend/pizzitalia-v/src/app/service/login.service.ts`
- `Frontend/pizzitalia-v/amplify.yml`
