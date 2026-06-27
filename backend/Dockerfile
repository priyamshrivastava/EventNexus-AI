# Step 1: Build the application using Maven
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app

# Copy dependency structures (Skipping the missing mvnw.cmd)
COPY pom.xml .
COPY .mvn .mvn
COPY mvnw .

# Fix script permissions and download dependencies
RUN chmod +x mvnw
RUN ./mvnw dependency:go-offline -B

# Copy source code and compile
COPY src ./src
RUN ./mvnw clean package -DskipTests

# Step 2: Run the application using an optimized JRE image
FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=build /app/target/eventai-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]