package com.txngui.backend.auth.models;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

public class UserDetailsImpl implements UserDetails {
    /**
     * The class UserDetails is a model class that represents the details of a user in the application.
     */

    private final User user;

    /**
     * Constructor with parameters
     * @param user user
     */
    public UserDetailsImpl(User user) {
        this.user = user;
    }

    /**
     * Getter of the user
     * @return the user
     */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.emptyList();
    }

    /**
     * Getter of the password of the user
     * @return the password of the user
     */
    @Override
    public String getPassword() {
        return user.getPassword();
    }

    /**
     * Getter of the username of the user
     * @return the username of the user
     */
    @Override
    public String getUsername() {
        return user.getUsername();
    }

    /**
     * Getter of the account non expired
     * @return true
     */
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    /**
     * Getter of the account non locked
     * @return true
     */
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    /**
     * Getter of the credentials non expired
     * @return true
     */
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    /**
     * Getter of the enabled
     * @return true
     */
    @Override
    public boolean isEnabled() {
        return true;
    }
}
