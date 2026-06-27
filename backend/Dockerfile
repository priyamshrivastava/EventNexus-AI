# Step 1: Build the application using standard Maven
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app

# Copy pom.xml and download dependencies natively
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy the actual source files and compile
COPY src ./src
RUN mvn clean package -DskipTests

# Step 2: Run the application using an optimized JRE image
FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=build /app/target/eventai-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]