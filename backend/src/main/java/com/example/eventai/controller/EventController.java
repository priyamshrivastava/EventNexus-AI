package com.example.eventai.controller;

import com.example.eventai.dto.DescriptionRequest;
import com.example.eventai.model.Event;
import com.example.eventai.repository.EventRepository;
import com.example.eventai.service.AiService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "*") // Allows all origins temporarily to debug CORS
public class EventController {

    private final AiService aiService;
    private final EventRepository eventRepository;

    public EventController(AiService aiService, EventRepository eventRepository) {
        this.aiService = aiService;
        this.eventRepository = eventRepository;
    }

    @PostMapping("/generate-description")
    public ResponseEntity<Map<String, String>> generateDescription(@RequestBody DescriptionRequest request) {
        String generatedText = aiService.generateDescription(request.getBulletPoints());
        Map<String, String> response = new HashMap<>();
        response.put("description", generatedText);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/save")
    public ResponseEntity<Event> saveEvent(@RequestBody Event event) {
        Event savedEvent = eventRepository.save(event);
        return ResponseEntity.ok(savedEvent);
    }
}