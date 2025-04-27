import React, {Component, useState} from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Dimensions, Button} from "react-native";
import { auth } from '@/FirebaseConfig';
import { getAuth } from 'firebase/auth'
import { router } from 'expo-router';

export default function SignOut() {

    getAuth().onAuthStateChanged((user) => {
        if (!user) router.replace('/');
    });

    return (
        <TouchableOpacity onPress={() => auth.signOut()}>
            <Text>Sign Out</Text>
        </TouchableOpacity>
    );
}