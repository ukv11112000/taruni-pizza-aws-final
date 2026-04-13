package com.example.demo.config;

import com.example.demo.service.CustomUserDetailsService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig {

    private final CustomUserDetailsService customUserDetailsService;
    private final JwtRequestFilter jwtRequestFilter;

    public SecurityConfig(CustomUserDetailsService customUserDetailsService,
                          JwtRequestFilter jwtRequestFilter) {
        this.customUserDetailsService = customUserDetailsService;
        this.jwtRequestFilter = jwtRequestFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .cors(Customizer.withDefaults())
            .csrf(csrf -> csrf.disable())
            .sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )
            .authorizeHttpRequests(auth -> auth

                // ✅ PUBLIC ENDPOINTS (UPDATED)
                .requestMatchers(
                    new AntPathRequestMatcher("/"),
                    new AntPathRequestMatcher("/hello"),
                    new AntPathRequestMatcher("/health"),
                    new AntPathRequestMatcher("/authenticate"),
                    new AntPathRequestMatcher("/user/login"),
                    new AntPathRequestMatcher("/user/forgotpassword"),
                    new AntPathRequestMatcher("/customer/add"),
                    new AntPathRequestMatcher("/customer/currentCustomer/**"),
                    new AntPathRequestMatcher("/customer/update"),
                    new AntPathRequestMatcher("/pizza/viewpizzalist/**"),
                    new AntPathRequestMatcher("/pizza/viewpizza/**"),
                    new AntPathRequestMatcher("/pizzaOrder/**"),
                    new AntPathRequestMatcher("/order/add"),
                    new AntPathRequestMatcher("/order/viewAll/**"),
                    new AntPathRequestMatcher("/user/currentUser/**"),

                    // 🔥 IMPORTANT FIX (THIS SOLVES YOUR 403)
                    new AntPathRequestMatcher("/api/**")
                ).permitAll()

                // 🔐 ADMIN / SUPERADMIN
                .requestMatchers(
                    new AntPathRequestMatcher("/user/all"),
                    new AntPathRequestMatcher("/user/addadmin/**"),
                    new AntPathRequestMatcher("/user/addsuperadmin"),
                    new AntPathRequestMatcher("/user/delete"),
                    new AntPathRequestMatcher("/coupan/**"),
                    new AntPathRequestMatcher("/coupan/viewAll"),
                    new AntPathRequestMatcher("/customer/delete"),
                    new AntPathRequestMatcher("/customer/all"),
                    new AntPathRequestMatcher("/order/viewAll"),
                    new AntPathRequestMatcher("/pizza/add"),
                    new AntPathRequestMatcher("/pizza/delete/**"),
                    new AntPathRequestMatcher("/pizza/update"),
                    new AntPathRequestMatcher("/pizzaOrder")
                ).hasAnyRole("ADMIN", "SUPERADMIN")

                // 👤 LOGGED-IN USERS
                .requestMatchers(
                    new AntPathRequestMatcher("/user/logout")
                ).hasAnyRole("USER", "ADMIN", "SUPERADMIN")

                // ❗ EVERYTHING ELSE
                .anyRequest().authenticated()
            )
            .authenticationProvider(authenticationProvider())
            .addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(customUserDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}