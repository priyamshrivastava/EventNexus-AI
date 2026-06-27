package com.example.eventai.controller;

import com.example.eventai.model.User;
import com.example.eventai.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    
    @Autowired
    private JavaMailSender mailSender;
    
    private final Map<String, String> otpStore = new ConcurrentHashMap<>();

    public AuthController(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/send-otp")
    public ResponseEntity<Map<String, String>> sendOtp(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        Map<String, String> response = new HashMap<>();

        if (email == null || email.trim().isEmpty()) {
            response.put("error", "Email is required");
            return ResponseEntity.badRequest().body(response);
        }

        if (userRepository.findByEmail(email) != null) {
            response.put("error", "Email is already registered");
            return ResponseEntity.badRequest().body(response);
        }

        String otp = String.format("%06d", new Random().nextInt(999999));
        otpStore.put(email, otp);

        try {
            System.out.println("Received OTP request for: " + email);
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("priyamshrivastava0@gmail.com");
            message.setTo(email);
            message.setSubject("Your SmartEvent Nexus Verification Code");
            message.setText("Welcome to SmartEvent Nexus!\n\nYour 6-digit verification code is: " + otp);
            
            mailSender.send(message);
            
            System.out.println("Email sent successfully!");
            response.put("message", "OTP sent successfully to your email address!");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            System.err.println("CRITICAL EMAIL ERROR THROWN: ");
            e.printStackTrace();
            response.put("error", "Failed to send email. " + e.getMessage());
            return ResponseEntity.status(500).body(response);
        }
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<Map<String, Boolean>> verifyOtp(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String otp = request.get("otp");
        Map<String, Boolean> response = new HashMap<>();
        
        if (otpStore.containsKey(email) && otpStore.get(email).equals(otp)) {
            response.put("verified", true);
            return ResponseEntity.ok(response);
        }
        
        response.put("verified", false);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/signup")
    public ResponseEntity<Map<String, String>> signup(@RequestBody User user) {
        Map<String, String> response = new HashMap<>();
        
        if (userRepository.findByUsername(user.getUsername()) != null) {
            response.put("error", "Username already exists");
            return ResponseEntity.badRequest().body(response);
        }
        
        if (userRepository.findByEmail(user.getEmail()) != null) {
            response.put("error", "Email already exists");
            return ResponseEntity.badRequest().body(response);
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        otpStore.remove(user.getEmail());
        
        response.put("message", "User created successfully");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody Map<String, String> credentials) {
        String identifier = credentials.get("identifier");
        String password = credentials.get("password");
        Map<String, String> response = new HashMap<>();
        
        User existingUser = userRepository.findByUsername(identifier);
        if (existingUser == null) {
            existingUser = userRepository.findByEmail(identifier);
        }
        
        if (existingUser != null && passwordEncoder.matches(password, existingUser.getPassword())) {
            response.put("message", "Login successful");
            response.put("username", existingUser.getUsername());
            response.put("email", existingUser.getEmail());
            return ResponseEntity.ok(response);
        }
        
        response.put("error", "Invalid credentials");
        return ResponseEntity.status(401).body(response);
    }
}