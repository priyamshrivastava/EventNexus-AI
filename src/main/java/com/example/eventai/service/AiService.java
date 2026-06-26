package com.example.eventai.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.HashMap;
import java.util.Map;
import java.util.List;

@Service
public class AiService {

    @Value("${gemini.api.key}")
    private String apiKey;

    @Value("${gemini.api.url}")
    private String apiUrl;

    private final WebClient webClient;
    private final ObjectMapper objectMapper;

    public AiService(WebClient.Builder webClientBuilder, ObjectMapper objectMapper) {
        this.webClient = webClientBuilder.build();
        this.objectMapper = objectMapper;
    }

    public String generateDescription(String bulletPoints) {
        String prompt = "You are an expert event copywriter. Take the following bullet points and turn them into a clear, engaging, and professional event description. Organize with logical headings and remove any messy markdown asterisks like **. Bullet points: \n" + bulletPoints;

        Map<String, Object> requestBody = new HashMap<>();
        Map<String, Object> content = new HashMap<>();
        Map<String, Object> part = new HashMap<>();
        
        part.put("text", prompt);
        content.put("parts", List.of(part));
        requestBody.put("contents", List.of(content));

        try {
            String response = webClient.post()
                    .uri(apiUrl + "?key=" + apiKey)
                    .header("Content-Type", "application/json")
                    .bodyValue(requestBody)
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();

            JsonNode rootNode = objectMapper.readTree(response);
            JsonNode textNode = rootNode.path("candidates").get(0).path("content").path("parts").get(0).path("text");
            
            return textNode.asText().replace("**", ""); 
        } catch (Exception e) {
            e.printStackTrace();
            return "Error generating description: " + e.getMessage();
        }
    }
}