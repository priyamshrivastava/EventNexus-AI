package com.example.eventai.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import java.util.HashMap;
import java.util.Map;
import java.util.List;

@Service
public class AiService {

    @Value("${openrouter.api.key}")
    private String apiKey;

    @Value("${openrouter.api.url}")
    private String apiUrl;

    private final WebClient webClient;
    private final ObjectMapper objectMapper;

    public AiService(WebClient.Builder webClientBuilder, ObjectMapper objectMapper) {
        this.webClient = webClientBuilder.build();
        this.objectMapper = objectMapper;
    }

    public String generateDescription(String bulletPoints) {
        String prompt = "You are an expert event copywriter. Take the following bullet points and turn them into a clear, engaging, and professional event description. Organize with logical headings and remove any messy markdown asterisks like **. Bullet points: \n" + bulletPoints;

        // "openrouter/auto" is a special meta-model that automatically routes to the best available 
        // free or cheap model that the current API key has access to.
        String modelName = "openrouter/auto";
        System.out.println("Attempting generation with OpenRouter auto-router...");
            
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("model", modelName);
        
        Map<String, String> message = new HashMap<>();
        message.put("role", "user");
        message.put("content", prompt);
        
        requestBody.put("messages", List.of(message));

        try {
            String response = webClient.post()
                    .uri(apiUrl)
                    .header("Authorization", "Bearer " + apiKey)
                    .header("HTTP-Referer", "http://localhost:8080")
                    .header("X-Title", "SmartEvent AI Platform")
                    .header("Content-Type", "application/json")
                    .bodyValue(requestBody)
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();

            JsonNode rootNode = objectMapper.readTree(response);
            
            JsonNode choicesNode = rootNode.path("choices");
            if (choicesNode.isMissingNode() || choicesNode.isEmpty()) {
                return "Error: Empty response from OpenRouter API. " + rootNode.toString();
            }
            
            JsonNode textNode = choicesNode.get(0).path("message").path("content");
            return textNode.asText().replace("**", ""); 
            
        } catch (WebClientResponseException e) {
            System.err.println("WebClient Error: " + e.getStatusCode() + " " + e.getResponseBodyAsString());
            return "API Error (" + e.getStatusCode() + "): " + e.getResponseBodyAsString();
        } catch (Exception e) {
            e.printStackTrace();
            return "Exception: " + e.getMessage();
        }
    }
}