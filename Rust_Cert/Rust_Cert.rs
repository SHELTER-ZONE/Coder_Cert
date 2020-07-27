#![feature(in_band_lifetimes)]
#![allow(non_snake_case)]

extern crate base64;
extern crate serde_json;
extern crate sha1;

use std::collections::HashMap;
use std::format;
use std::panic;
use std::println;

use base64::{decode};
use serde_json::{from_str};
use sha1::{Sha1, Digest};


fn initialize() -> String {
    let base64_decoded_bytes: Vec<u8> = decode("eyIxMCI6ICIyMzM2IiwgIjMzMzUiOiAiMjM1MyIsICI1Nj\
    g3OSI6ICIyMzgwIiwgIjg4NzY5MiI6ICIyMzkwIiwgIjg4ODY3OSI6ICIyMzk0IiwgIjAwIjogIiIsICI1NjM2OTgxNDY4ND\
    A1IjogIiIsICI1NjM2OTgxNDY4NDE1IjogIiIsICI4MDI0Mzg3NjU1MjQxIjogIiIsICI5ODc1NjQ4MzY1OTI3NDcyOTQiOi\
    AiIn0=").unwrap();
    let base64_decoded_string: String = String::from_utf8(base64_decoded_bytes).unwrap();

    return base64_decoded_string;
}

struct LockSolver<'a> {
    test_answers: Vec<String>,
    solve_method: &'a dyn Fn(&String) -> String,
    test_cases: HashMap<String, String>,
}
impl<'a> LockSolver<'a> {
    fn new<F>(solve_method: &'a F) -> LockSolver<'a> where F: Fn(&String) -> String {
        return LockSolver {
            test_answers: vec![],
            solve_method,
            test_cases: from_str(&*initialize()).unwrap(),
        }
    }

    fn run(self_: &mut Self) {
        let method: &dyn Fn(&String) -> String = self_.solve_method;
        let sample_test = method(&String::from("12345"));
        let mut lock_number: i32 = 1;

        if sample_test != "2353" {
            panic!(format!("Your `solve` method returned {} instead of \"2353\"", sample_test));
        }

        for (key, value) in self_.test_cases.iter() {
            let method_result = method(key);

            if &method_result != value && value != "" {
                panic!(format!("Failed to open lock #{}, your solution is probably wrong - please \
                make sure that your `solve` method is correct.", lock_number));
            }

            lock_number += 1;
        }
    }

    fn get_password(self_: &Self, user_id: String) -> String {
        let mut sha1_hasher: Sha1 = Sha1::new();
        let mut answer: String = self_.test_answers.join("");
        answer += &*user_id;

        sha1_hasher.update(answer.as_bytes());
        let result: Digest = sha1_hasher.digest();
        return result.to_string();
    }
}

fn encrypt(number: u64) -> u64 {
    return number >> 23 ^ 2333;
}

fn solve(s: &String) -> String {
    // Complete this method.
}

fn main() {
    // Complete this method.
}
