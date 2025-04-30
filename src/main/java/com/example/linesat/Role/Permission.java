package com.example.linesat.Role;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Permission {

    ADMIN_READ("it_support:read"),
    ADMIN_UPDATE("it_support:update"),
    ADMIN_COMMENT("it_support:comment");

    private final String permission;
}