import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
const teams = [
  { id: 1, name: 'Mumbai Indians', short: "MI", matches: 0, won: 0, lost: 0, tied: 0, nr: 0, point: 0, nrr: 0.0 },
  { id: 2, name: 'Chennai Super Kings', short: "CSK", matches: 0, won: 0, lost: 0, tied: 0, nr: 0, point: 0, nrr: 0.0 },
  { id: 3, name: 'Royal Challengers Bangalore', short: "RCB", matches: 0, won: 0, lost: 0, tied: 0, nr: 0, point: 0, nrr: 0.0 },
  { id: 4, name: 'Kolkata Knight Riders', short: "KKR", matches: 0, won: 0, lost: 0, tied: 0, nr: 0, point: 0, nrr: 0.0 },
  { id: 5, name: 'Delhi Capitals', short: "DC", matches: 0, won: 0, lost: 0, tied: 0, nr: 0, point: 0, nrr: 0.0 },
  { id: 6, name: 'Punjab Kings', short: "PBKS", matches: 0, won: 0, lost: 0, tied: 0, nr: 0, point: 0, nrr: 0.0 },
  { id: 7, name: 'Rajasthan Royals', short: "RR", matches: 0, won: 0, lost: 0, tied: 0, nr: 0, point: 0, nrr: 0.0 },
  { id: 8, name: 'Sunrisers Hyderabad', short: "SRH", matches: 0, won: 0, lost: 0, tied: 0, nr: 0, point: 0, nrr: 0.0 },
  { id: 9, name: 'Lucknow Super Giants', short: "LSG", matches: 0, won: 0, lost: 0, tied: 0, nr: 0, point: 0, nrr: 0.0 },
  { id: 10, name: 'Gujarat Titans', short: "GT", matches: 0, won: 0, lost: 0, tied: 0, nr: 0, point: 0, nrr: 0.0 }
];
const players = [
  { id: 1, name: "Player 1", short: "P1", role_id: 1, batting_rating: 9, bowling_rating: 0, matches: 0, innings: 0, runs: 0, balls: 0, fours: 0, sixes: 0, strike_rate: 0.0, half_century: 0, century: 0, batting_avg: 0.0, overs: 0, runs_given: 0, wickets: 0, maiden: 0, bowl_avg: 0, bowl_strike_rate: 0, eco: 0, four_fers: 0, five_fers: 0, captain: false, wk: false },
  { id: 2, name: "Player 2", short: "P2", role_id: 1, batting_rating: 9, bowling_rating: 0, matches: 0, innings: 0, runs: 0, balls: 0, fours: 0, sixes: 0, strike_rate: 0.0, half_century: 0, century: 0, batting_avg: 0.0, overs: 0, runs_given: 0, wickets: 0, maiden: 0, bowl_avg: 0, bowl_strike_rate: 0, eco: 0, four_fers: 0, five_fers: 0, captain: false, wk: false },
  { id: 3, name: "Player 3", short: "P3", role_id: 1, batting_rating: 9, bowling_rating: 0, matches: 0, innings: 0, runs: 0, balls: 0, fours: 0, sixes: 0, strike_rate: 0.0, half_century: 0, century: 0, batting_avg: 0.0, overs: 0, runs_given: 0, wickets: 0, maiden: 0, bowl_avg: 0, bowl_strike_rate: 0, eco: 0, four_fers: 0, five_fers: 0, captain: false, wk: false },
  { id: 4, name: "Player 4", short: "P4", role_id: 1, batting_rating: 9, bowling_rating: 0, matches: 0, innings: 0, runs: 0, balls: 0, fours: 0, sixes: 0, strike_rate: 0.0, half_century: 0, century: 0, batting_avg: 0.0, overs: 0, runs_given: 0, wickets: 0, maiden: 0, bowl_avg: 0, bowl_strike_rate: 0, eco: 0, four_fers: 0, five_fers: 0, captain: false, wk: false },
  { id: 5, name: "Player 5", short: "P5", role_id: 1, batting_rating: 9, bowling_rating: 0, matches: 0, innings: 0, runs: 0, balls: 0, fours: 0, sixes: 0, strike_rate: 0.0, half_century: 0, century: 0, batting_avg: 0.0, overs: 0, runs_given: 0, wickets: 0, maiden: 0, bowl_avg: 0, bowl_strike_rate: 0, eco: 0, four_fers: 0, five_fers: 0, captain: false, wk: false },
  { id: 6, name: "Player 6", short: "P6", role_id: 1, batting_rating: 9, bowling_rating: 0, matches: 0, innings: 0, runs: 0, balls: 0, fours: 0, sixes: 0, strike_rate: 0.0, half_century: 0, century: 0, batting_avg: 0.0, overs: 0, runs_given: 0, wickets: 0, maiden: 0, bowl_avg: 0, bowl_strike_rate: 0, eco: 0, four_fers: 0, five_fers: 0, captain: false, wk: false },
  { id: 7, name: "Player 7", short: "P7", role_id: 1, batting_rating: 9, bowling_rating: 0, matches: 0, innings: 0, runs: 0, balls: 0, fours: 0, sixes: 0, strike_rate: 0.0, half_century: 0, century: 0, batting_avg: 0.0, overs: 0, runs_given: 0, wickets: 0, maiden: 0, bowl_avg: 0, bowl_strike_rate: 0, eco: 0, four_fers: 0, five_fers: 0, captain: false, wk: false },
  { id: 8, name: "Player 8", short: "P8", role_id: 1, batting_rating: 9, bowling_rating: 0, matches: 0, innings: 0, runs: 0, balls: 0, fours: 0, sixes: 0, strike_rate: 0.0, half_century: 0, century: 0, batting_avg: 0.0, overs: 0, runs_given: 0, wickets: 0, maiden: 0, bowl_avg: 0, bowl_strike_rate: 0, eco: 0, four_fers: 0, five_fers: 0, captain: false, wk: false },
  { id: 9, name: "Player 9", short: "P9", role_id: 1, batting_rating: 9, bowling_rating: 0, matches: 0, innings: 0, runs: 0, balls: 0, fours: 0, sixes: 0, strike_rate: 0.0, half_century: 0, century: 0, batting_avg: 0.0, overs: 0, runs_given: 0, wickets: 0, maiden: 0, bowl_avg: 0, bowl_strike_rate: 0, eco: 0, four_fers: 0, five_fers: 0, captain: false, wk: false },
  { id: 10, name: "Player 10", short: "P10", role_id: 1, batting_rating: 9, bowling_rating: 0, matches: 0, innings: 0, runs: 0, balls: 0, fours: 0, sixes: 0, strike_rate: 0.0, half_century: 0, century: 0, batting_avg: 0.0, overs: 0, runs_given: 0, wickets: 0, maiden: 0, bowl_avg: 0, bowl_strike_rate: 0, eco: 0, four_fers: 0, five_fers: 0, captain: false, wk: false },
  { id: 11, name: "Player 11", short: "P11", role_id: 1, batting_rating: 9, bowling_rating: 0, matches: 0, innings: 0, runs: 0, balls: 0, fours: 0, sixes: 0, strike_rate: 0.0, half_century: 0, century: 0, batting_avg: 0.0, overs: 0, runs_given: 0, wickets: 0, maiden: 0, bowl_avg: 0, bowl_strike_rate: 0, eco: 0, four_fers: 0, five_fers: 0, captain: false, wk: false },

  { id: 12, name: "Player 1", short: "P1", role_id: 1, batting_rating: 9, bowling_rating: 0, matches: 0, innings: 0, runs: 0, balls: 0, fours: 0, sixes: 0, strike_rate: 0.0, half_century: 0, century: 0, batting_avg: 0.0, overs: 0, runs_given: 0, wickets: 0, maiden: 0, bowl_avg: 0, bowl_strike_rate: 0, eco: 0, four_fers: 0, five_fers: 0, captain: false, wk: false },
  { id: 13, name: "Player 2", short: "P2", role_id: 1, batting_rating: 9, bowling_rating: 0, matches: 0, innings: 0, runs: 0, balls: 0, fours: 0, sixes: 0, strike_rate: 0.0, half_century: 0, century: 0, batting_avg: 0.0, overs: 0, runs_given: 0, wickets: 0, maiden: 0, bowl_avg: 0, bowl_strike_rate: 0, eco: 0, four_fers: 0, five_fers: 0, captain: false, wk: false },
  { id: 14, name: "Player 3", short: "P3", role_id: 1, batting_rating: 9, bowling_rating: 0, matches: 0, innings: 0, runs: 0, balls: 0, fours: 0, sixes: 0, strike_rate: 0.0, half_century: 0, century: 0, batting_avg: 0.0, overs: 0, runs_given: 0, wickets: 0, maiden: 0, bowl_avg: 0, bowl_strike_rate: 0, eco: 0, four_fers: 0, five_fers: 0, captain: false, wk: false },
  { id: 15, name: "Player 4", short: "P4", role_id: 1, batting_rating: 9, bowling_rating: 0, matches: 0, innings: 0, runs: 0, balls: 0, fours: 0, sixes: 0, strike_rate: 0.0, half_century: 0, century: 0, batting_avg: 0.0, overs: 0, runs_given: 0, wickets: 0, maiden: 0, bowl_avg: 0, bowl_strike_rate: 0, eco: 0, four_fers: 0, five_fers: 0, captain: false, wk: false },
  { id: 16, name: "Player 5", short: "P5", role_id: 1, batting_rating: 9, bowling_rating: 0, matches: 0, innings: 0, runs: 0, balls: 0, fours: 0, sixes: 0, strike_rate: 0.0, half_century: 0, century: 0, batting_avg: 0.0, overs: 0, runs_given: 0, wickets: 0, maiden: 0, bowl_avg: 0, bowl_strike_rate: 0, eco: 0, four_fers: 0, five_fers: 0, captain: false, wk: false },
  { id: 17, name: "Player 6", short: "P6", role_id: 1, batting_rating: 9, bowling_rating: 0, matches: 0, innings: 0, runs: 0, balls: 0, fours: 0, sixes: 0, strike_rate: 0.0, half_century: 0, century: 0, batting_avg: 0.0, overs: 0, runs_given: 0, wickets: 0, maiden: 0, bowl_avg: 0, bowl_strike_rate: 0, eco: 0, four_fers: 0, five_fers: 0, captain: false, wk: false },
  { id: 18, name: "Player 7", short: "P7", role_id: 1, batting_rating: 9, bowling_rating: 0, matches: 0, innings: 0, runs: 0, balls: 0, fours: 0, sixes: 0, strike_rate: 0.0, half_century: 0, century: 0, batting_avg: 0.0, overs: 0, runs_given: 0, wickets: 0, maiden: 0, bowl_avg: 0, bowl_strike_rate: 0, eco: 0, four_fers: 0, five_fers: 0, captain: false, wk: false },
  { id: 19, name: "Player 8", short: "P8", role_id: 1, batting_rating: 9, bowling_rating: 0, matches: 0, innings: 0, runs: 0, balls: 0, fours: 0, sixes: 0, strike_rate: 0.0, half_century: 0, century: 0, batting_avg: 0.0, overs: 0, runs_given: 0, wickets: 0, maiden: 0, bowl_avg: 0, bowl_strike_rate: 0, eco: 0, four_fers: 0, five_fers: 0, captain: false, wk: false },
  { id: 20, name: "Player 9", short: "P9", role_id: 1, batting_rating: 9, bowling_rating: 0, matches: 0, innings: 0, runs: 0, balls: 0, fours: 0, sixes: 0, strike_rate: 0.0, half_century: 0, century: 0, batting_avg: 0.0, overs: 0, runs_given: 0, wickets: 0, maiden: 0, bowl_avg: 0, bowl_strike_rate: 0, eco: 0, four_fers: 0, five_fers: 0, captain: false, wk: false },
  { id: 21, name: "Player 10", short: "P10", role_id: 1, batting_rating: 9, bowling_rating: 0, matches: 0, innings: 0, runs: 0, balls: 0, fours: 0, sixes: 0, strike_rate: 0.0, half_century: 0, century: 0, batting_avg: 0.0, overs: 0, runs_given: 0, wickets: 0, maiden: 0, bowl_avg: 0, bowl_strike_rate: 0, eco: 0, four_fers: 0, five_fers: 0, captain: false, wk: false },
  { id: 22, name: "Player 11", short: "P11", role_id: 1, batting_rating: 9, bowling_rating: 0, matches: 0, innings: 0, runs: 0, balls: 0, fours: 0, sixes: 0, strike_rate: 0.0, half_century: 0, century: 0, batting_avg: 0.0, overs: 0, runs_given: 0, wickets: 0, maiden: 0, bowl_avg: 0, bowl_strike_rate: 0, eco: 0, four_fers: 0, five_fers: 0, captain: false, wk: false },

  { id: 23, name: "Player 1", short: "P1", role_id: 1, batting_rating: 9, bowling_rating: 0, matches: 0, innings: 0, runs: 0, balls: 0, fours: 0, sixes: 0, strike_rate: 0.0, half_century: 0, century: 0, batting_avg: 0.0, overs: 0, runs_given: 0, wickets: 0, maiden: 0, bowl_avg: 0, bowl_strike_rate: 0, eco: 0, four_fers: 0, five_fers: 0, captain: false, wk: false },
  { id: 24, name: "Player 2", short: "P2", role_id: 1, batting_rating: 9, bowling_rating: 0, matches: 0, innings: 0, runs: 0, balls: 0, fours: 0, sixes: 0, strike_rate: 0.0, half_century: 0, century: 0, batting_avg: 0.0, overs: 0, runs_given: 0, wickets: 0, maiden: 0, bowl_avg: 0, bowl_strike_rate: 0, eco: 0, four_fers: 0, five_fers: 0, captain: false, wk: false },
  { id: 25, name: "Player 3", short: "P3", role_id: 1, batting_rating: 9, bowling_rating: 0, matches: 0, innings: 0, runs: 0, balls: 0, fours: 0, sixes: 0, strike_rate: 0.0, half_century: 0, century: 0, batting_avg: 0.0, overs: 0, runs_given: 0, wickets: 0, maiden: 0, bowl_avg: 0, bowl_strike_rate: 0, eco: 0, four_fers: 0, five_fers: 0, captain: false, wk: false },
  { id: 26, name: "Player 4", short: "P4", role_id: 1, batting_rating: 9, bowling_rating: 0, matches: 0, innings: 0, runs: 0, balls: 0, fours: 0, sixes: 0, strike_rate: 0.0, half_century: 0, century: 0, batting_avg: 0.0, overs: 0, runs_given: 0, wickets: 0, maiden: 0, bowl_avg: 0, bowl_strike_rate: 0, eco: 0, four_fers: 0, five_fers: 0, captain: false, wk: false },
  { id: 27, name: "Player 5", short: "P5", role_id: 1, batting_rating: 9, bowling_rating: 0, matches: 0, innings: 0, runs: 0, balls: 0, fours: 0, sixes: 0, strike_rate: 0.0, half_century: 0, century: 0, batting_avg: 0.0, overs: 0, runs_given: 0, wickets: 0, maiden: 0, bowl_avg: 0, bowl_strike_rate: 0, eco: 0, four_fers: 0, five_fers: 0, captain: false, wk: false },
  { id: 28, name: "Player 6", short: "P6", role_id: 1, batting_rating: 9, bowling_rating: 0, matches: 0, innings: 0, runs: 0, balls: 0, fours: 0, sixes: 0, strike_rate: 0.0, half_century: 0, century: 0, batting_avg: 0.0, overs: 0, runs_given: 0, wickets: 0, maiden: 0, bowl_avg: 0, bowl_strike_rate: 0, eco: 0, four_fers: 0, five_fers: 0, captain: false, wk: false },
  { id: 29, name: "Player 7", short: "P7", role_id: 1, batting_rating: 9, bowling_rating: 0, matches: 0, innings: 0, runs: 0, balls: 0, fours: 0, sixes: 0, strike_rate: 0.0, half_century: 0, century: 0, batting_avg: 0.0, overs: 0, runs_given: 0, wickets: 0, maiden: 0, bowl_avg: 0, bowl_strike_rate: 0, eco: 0, four_fers: 0, five_fers: 0, captain: false, wk: false },
  { id: 30, name: "Player 8", short: "P8", role_id: 1, batting_rating: 9, bowling_rating: 0, matches: 0, innings: 0, runs: 0, balls: 0, fours: 0, sixes: 0, strike_rate: 0.0, half_century: 0, century: 0, batting_avg: 0.0, overs: 0, runs_given: 0, wickets: 0, maiden: 0, bowl_avg: 0, bowl_strike_rate: 0, eco: 0, four_fers: 0, five_fers: 0, captain: false, wk: false },
  { id: 31, name: "Player 9", short: "P9", role_id: 1, batting_rating: 9, bowling_rating: 0, matches: 0, innings: 0, runs: 0, balls: 0, fours: 0, sixes: 0, strike_rate: 0.0, half_century: 0, century: 0, batting_avg: 0.0, overs: 0, runs_given: 0, wickets: 0, maiden: 0, bowl_avg: 0, bowl_strike_rate: 0, eco: 0, four_fers: 0, five_fers: 0, captain: false, wk: false },
  { id: 32, name: "Player 10", short: "P10", role_id: 1, batting_rating: 9, bowling_rating: 0, matches: 0, innings: 0, runs: 0, balls: 0, fours: 0, sixes: 0, strike_rate: 0.0, half_century: 0, century: 0, batting_avg: 0.0, overs: 0, runs_given: 0, wickets: 0, maiden: 0, bowl_avg: 0, bowl_strike_rate: 0, eco: 0, four_fers: 0, five_fers: 0, captain: false, wk: false },
  { id: 33, name: "Player 11", short: "P11", role_id: 1, batting_rating: 9, bowling_rating: 0, matches: 0, innings: 0, runs: 0, balls: 0, fours: 0, sixes: 0, strike_rate: 0.0, half_century: 0, century: 0, batting_avg: 0.0, overs: 0, runs_given: 0, wickets: 0, maiden: 0, bowl_avg: 0, bowl_strike_rate: 0, eco: 0, four_fers: 0, five_fers: 0, captain: false, wk: false },

  { id: 34, name: "Player 1", short: "P1", role_id: 1, batting_rating: 9, bowling_rating: 0, matches: 0, innings: 0, runs: 0, balls: 0, fours: 0, sixes: 0, strike_rate: 0.0, half_century: 0, century: 0, batting_avg: 0.0, overs: 0, runs_given: 0, wickets: 0, maiden: 0, bowl_avg: 0, bowl_strike_rate: 0, eco: 0, four_fers: 0, five_fers: 0, captain: false, wk: false },
  { id: 35, name: "Player 2", short: "P2", role_id: 1, batting_rating: 9, bowling_rating: 0, matches: 0, innings: 0, runs: 0, balls: 0, fours: 0, sixes: 0, strike_rate: 0.0, half_century: 0, century: 0, batting_avg: 0.0, overs: 0, runs_given: 0, wickets: 0, maiden: 0, bowl_avg: 0, bowl_strike_rate: 0, eco: 0, four_fers: 0, five_fers: 0, captain: false, wk: false },
  { id: 36, name: "Player 3", short: "P3", role_id: 1, batting_rating: 9, bowling_rating: 0, matches: 0, innings: 0, runs: 0, balls: 0, fours: 0, sixes: 0, strike_rate: 0.0, half_century: 0, century: 0, batting_avg: 0.0, overs: 0, runs_given: 0, wickets: 0, maiden: 0, bowl_avg: 0, bowl_strike_rate: 0, eco: 0, four_fers: 0, five_fers: 0, captain: false, wk: false },
  { id: 37, name: "Player 4", short: "P4", role_id: 1, batting_rating: 9, bowling_rating: 0, matches: 0, innings: 0, runs: 0, balls: 0, fours: 0, sixes: 0, strike_rate: 0.0, half_century: 0, century: 0, batting_avg: 0.0, overs: 0, runs_given: 0, wickets: 0, maiden: 0, bowl_avg: 0, bowl_strike_rate: 0, eco: 0, four_fers: 0, five_fers: 0, captain: false, wk: false },
  { id: 38, name: "Player 5", short: "P5", role_id: 1, batting_rating: 9, bowling_rating: 0, matches: 0, innings: 0, runs: 0, balls: 0, fours: 0, sixes: 0, strike_rate: 0.0, half_century: 0, century: 0, batting_avg: 0.0, overs: 0, runs_given: 0, wickets: 0, maiden: 0, bowl_avg: 0, bowl_strike_rate: 0, eco: 0, four_fers: 0, five_fers: 0, captain: false, wk: false },
  { id: 39, name: "Player 6", short: "P6", role_id: 1, batting_rating: 9, bowling_rating: 0, matches: 0, innings: 0, runs: 0, balls: 0, fours: 0, sixes: 0, strike_rate: 0.0, half_century: 0, century: 0, batting_avg: 0.0, overs: 0, runs_given: 0, wickets: 0, maiden: 0, bowl_avg: 0, bowl_strike_rate: 0, eco: 0, four_fers: 0, five_fers: 0, captain: false, wk: false },
  { id: 40, name: "Player 7", short: "P7", role_id: 1, batting_rating: 9, bowling_rating: 0, matches: 0, innings: 0, runs: 0, balls: 0, fours: 0, sixes: 0, strike_rate: 0.0, half_century: 0, century: 0, batting_avg: 0.0, overs: 0, runs_given: 0, wickets: 0, maiden: 0, bowl_avg: 0, bowl_strike_rate: 0, eco: 0, four_fers: 0, five_fers: 0, captain: false, wk: false },
  { id: 41, name: "Player 8", short: "P8", role_id: 1, batting_rating: 9, bowling_rating: 0, matches: 0, innings: 0, runs: 0, balls: 0, fours: 0, sixes: 0, strike_rate: 0.0, half_century: 0, century: 0, batting_avg: 0.0, overs: 0, runs_given: 0, wickets: 0, maiden: 0, bowl_avg: 0, bowl_strike_rate: 0, eco: 0, four_fers: 0, five_fers: 0, captain: false, wk: false },
  { id: 42, name: "Player 9", short: "P9", role_id: 1, batting_rating: 9, bowling_rating: 0, matches: 0, innings: 0, runs: 0, balls: 0, fours: 0, sixes: 0, strike_rate: 0.0, half_century: 0, century: 0, batting_avg: 0.0, overs: 0, runs_given: 0, wickets: 0, maiden: 0, bowl_avg: 0, bowl_strike_rate: 0, eco: 0, four_fers: 0, five_fers: 0, captain: false, wk: false },
  { id: 43, name: "Player 10", short: "P10", role_id: 1, batting_rating: 9, bowling_rating: 0, matches: 0, innings: 0, runs: 0, balls: 0, fours: 0, sixes: 0, strike_rate: 0.0, half_century: 0, century: 0, batting_avg: 0.0, overs: 0, runs_given: 0, wickets: 0, maiden: 0, bowl_avg: 0, bowl_strike_rate: 0, eco: 0, four_fers: 0, five_fers: 0, captain: false, wk: false },
  { id: 44, name: "Player 11", short: "P11", role_id: 1, batting_rating: 9, bowling_rating: 0, matches: 0, innings: 0, runs: 0, balls: 0, fours: 0, sixes: 0, strike_rate: 0.0, half_century: 0, century: 0, batting_avg: 0.0, overs: 0, runs_given: 0, wickets: 0, maiden: 0, bowl_avg: 0, bowl_strike_rate: 0, eco: 0, four_fers: 0, five_fers: 0, captain: false, wk: false },

  { id: 45, name: "Player 1", short: "P1", role_id: 1, batting_rating: 9, bowling_rating: 0, matches: 0, innings: 0, runs: 0, balls: 0, fours: 0, sixes: 0, strike_rate: 0.0, half_century: 0, century: 0, batting_avg: 0.0, overs: 0, runs_given: 0, wickets: 0, maiden: 0, bowl_avg: 0, bowl_strike_rate: 0, eco: 0, four_fers: 0, five_fers: 0, captain: false, wk: false },
  { id: 46, name: "Player 2", short: "P2", role_id: 1, batting_rating: 9, bowling_rating: 0, matches: 0, innings: 0, runs: 0, balls: 0, fours: 0, sixes: 0, strike_rate: 0.0, half_century: 0, century: 0, batting_avg: 0.0, overs: 0, runs_given: 0, wickets: 0, maiden: 0, bowl_avg: 0, bowl_strike_rate: 0, eco: 0, four_fers: 0, five_fers: 0, captain: false, wk: false },
  { id: 47, name: "Player 3", short: "P3", role_id: 1, batting_rating: 9, bowling_rating: 0, matches: 0, innings: 0, runs: 0, balls: 0, fours: 0, sixes: 0, strike_rate: 0.0, half_century: 0, century: 0, batting_avg: 0.0, overs: 0, runs_given: 0, wickets: 0, maiden: 0, bowl_avg: 0, bowl_strike_rate: 0, eco: 0, four_fers: 0, five_fers: 0, captain: false, wk: false },
  { id: 48, name: "Player 4", short: "P4", role_id: 1, batting_rating: 9, bowling_rating: 0, matches: 0, innings: 0, runs: 0, balls: 0, fours: 0, sixes: 0, strike_rate: 0.0, half_century: 0, century: 0, batting_avg: 0.0, overs: 0, runs_given: 0, wickets: 0, maiden: 0, bowl_avg: 0, bowl_strike_rate: 0, eco: 0, four_fers: 0, five_fers: 0, captain: false, wk: false },
  { id: 49, name: "Player 5", short: "P5", role_id: 1, batting_rating: 9, bowling_rating: 0, matches: 0, innings: 0, runs: 0, balls: 0, fours: 0, sixes: 0, strike_rate: 0.0, half_century: 0, century: 0, batting_avg: 0.0, overs: 0, runs_given: 0, wickets: 0, maiden: 0, bowl_avg: 0, bowl_strike_rate: 0, eco: 0, four_fers: 0, five_fers: 0, captain: false, wk: false },
  { id: 50, name: "Player 6", short: "P6", role_id: 1, batting_rating: 9, bowling_rating: 0, matches: 0, innings: 0, runs: 0, balls: 0, fours: 0, sixes: 0, strike_rate: 0.0, half_century: 0, century: 0, batting_avg: 0.0, overs: 0, runs_given: 0, wickets: 0, maiden: 0, bowl_avg: 0, bowl_strike_rate: 0, eco: 0, four_fers: 0, five_fers: 0, captain: false, wk: false },
  { id: 51, name: "Player 7", short: "P7", role_id: 1, batting_rating: 9, bowling_rating: 0, matches: 0, innings: 0, runs: 0, balls: 0, fours: 0, sixes: 0, strike_rate: 0.0, half_century: 0, century: 0, batting_avg: 0.0, overs: 0, runs_given: 0, wickets: 0, maiden: 0, bowl_avg: 0, bowl_strike_rate: 0, eco: 0, four_fers: 0, five_fers: 0, captain: false, wk: false },
  { id: 52, name: "Player 8", short: "P8", role_id: 1, batting_rating: 9, bowling_rating: 0, matches: 0, innings: 0, runs: 0, balls: 0, fours: 0, sixes: 0, strike_rate: 0.0, half_century: 0, century: 0, batting_avg: 0.0, overs: 0, runs_given: 0, wickets: 0, maiden: 0, bowl_avg: 0, bowl_strike_rate: 0, eco: 0, four_fers: 0, five_fers: 0, captain: false, wk: false },
  { id: 53, name: "Player 9", short: "P9", role_id: 1, batting_rating: 9, bowling_rating: 0, matches: 0, innings: 0, runs: 0, balls: 0, fours: 0, sixes: 0, strike_rate: 0.0, half_century: 0, century: 0, batting_avg: 0.0, overs: 0, runs_given: 0, wickets: 0, maiden: 0, bowl_avg: 0, bowl_strike_rate: 0, eco: 0, four_fers: 0, five_fers: 0, captain: false, wk: false },
  { id: 54, name: "Player 10", short: "P10", role_id: 1, batting_rating: 9, bowling_rating: 0, matches: 0, innings: 0, runs: 0, balls: 0, fours: 0, sixes: 0, strike_rate: 0.0, half_century: 0, century: 0, batting_avg: 0.0, overs: 0, runs_given: 0, wickets: 0, maiden: 0, bowl_avg: 0, bowl_strike_rate: 0, eco: 0, four_fers: 0, five_fers: 0, captain: false, wk: false },
  { id: 55, name: "Player 11", short: "P11", role_id: 1, batting_rating: 9, bowling_rating: 0, matches: 0, innings: 0, runs: 0, balls: 0, fours: 0, sixes: 0, strike_rate: 0.0, half_century: 0, century: 0, batting_avg: 0.0, overs: 0, runs_given: 0, wickets: 0, maiden: 0, bowl_avg: 0, bowl_strike_rate: 0, eco: 0, four_fers: 0, five_fers: 0, captain: false, wk: false },

  { id: 56, name: "Player 1", short: "P1", role_id: 1, batting_rating: 9, bowling_rating: 0, matches: 0, innings: 0, runs: 0, balls: 0, fours: 0, sixes: 0, strike_rate: 0.0, half_century: 0, century: 0, batting_avg: 0.0, overs: 0, runs_given: 0, wickets: 0, maiden: 0, bowl_avg: 0, bowl_strike_rate: 0, eco: 0, four_fers: 0, five_fers: 0, captain: false, wk: false },
  { id: 57, name: "Player 2", short: "P2", role_id: 1, batting_rating: 9, bowling_rating: 0, matches: 0, innings: 0, runs: 0, balls: 0, fours: 0, sixes: 0, strike_rate: 0.0, half_century: 0, century: 0, batting_avg: 0.0, overs: 0, runs_given: 0, wickets: 0, maiden: 0, bowl_avg: 0, bowl_strike_rate: 0, eco: 0, four_fers: 0, five_fers: 0, captain: false, wk: false },
  { id: 58, name: "Player 3", short: "P3", role_id: 1, batting_rating: 9, bowling_rating: 0, matches: 0, innings: 0, runs: 0, balls: 0, fours: 0, sixes: 0, strike_rate: 0.0, half_century: 0, century: 0, batting_avg: 0.0, overs: 0, runs_given: 0, wickets: 0, maiden: 0, bowl_avg: 0, bowl_strike_rate: 0, eco: 0, four_fers: 0, five_fers: 0, captain: false, wk: false },
  { id: 59, name: "Player 4", short: "P4", role_id: 1, batting_rating: 9, bowling_rating: 0, matches: 0, innings: 0, runs: 0, balls: 0, fours: 0, sixes: 0, strike_rate: 0.0, half_century: 0, century: 0, batting_avg: 0.0, overs: 0, runs_given: 0, wickets: 0, maiden: 0, bowl_avg: 0, bowl_strike_rate: 0, eco: 0, four_fers: 0, five_fers: 0, captain: false, wk: false },
  { id: 60, name: "Player 5", short: "P5", role_id: 1, batting_rating: 9, bowling_rating: 0, matches: 0, innings: 0, runs: 0, balls: 0, fours: 0, sixes: 0, strike_rate: 0.0, half_century: 0, century: 0, batting_avg: 0.0, overs: 0, runs_given: 0, wickets: 0, maiden: 0, bowl_avg: 0, bowl_strike_rate: 0, eco: 0, four_fers: 0, five_fers: 0, captain: false, wk: false },
  { id: 61, name: "Player 6", short: "P6", role_id: 1, batting_rating: 9, bowling_rating: 0, matches: 0, innings: 0, runs: 0, balls: 0, fours: 0, sixes: 0, strike_rate: 0.0, half_century: 0, century: 0, batting_avg: 0.0, overs: 0, runs_given: 0, wickets: 0, maiden: 0, bowl_avg: 0, bowl_strike_rate: 0, eco: 0, four_fers: 0, five_fers: 0, captain: false, wk: false },
  { id: 62, name: "Player 7", short: "P7", role_id: 1, batting_rating: 9, bowling_rating: 0, matches: 0, innings: 0, runs: 0, balls: 0, fours: 0, sixes: 0, strike_rate: 0.0, half_century: 0, century: 0, batting_avg: 0.0, overs: 0, runs_given: 0, wickets: 0, maiden: 0, bowl_avg: 0, bowl_strike_rate: 0, eco: 0, four_fers: 0, five_fers: 0, captain: false, wk: false },
  { id: 63, name: "Player 8", short: "P8", role_id: 1, batting_rating: 9, bowling_rating: 0, matches: 0, innings: 0, runs: 0, balls: 0, fours: 0, sixes: 0, strike_rate: 0.0, half_century: 0, century: 0, batting_avg: 0.0, overs: 0, runs_given: 0, wickets: 0, maiden: 0, bowl_avg: 0, bowl_strike_rate: 0, eco: 0, four_fers: 0, five_fers: 0, captain: false, wk: false },
  { id: 64, name: "Player 9", short: "P9", role_id: 1, batting_rating: 9, bowling_rating: 0, matches: 0, innings: 0, runs: 0, balls: 0, fours: 0, sixes: 0, strike_rate: 0.0, half_century: 0, century: 0, batting_avg: 0.0, overs: 0, runs_given: 0, wickets: 0, maiden: 0, bowl_avg: 0, bowl_strike_rate: 0, eco: 0, four_fers: 0, five_fers: 0, captain: false, wk: false },
  { id: 65, name: "Player 10", short: "P10", role_id: 1, batting_rating: 9, bowling_rating: 0, matches: 0, innings: 0, runs: 0, balls: 0, fours: 0, sixes: 0, strike_rate: 0.0, half_century: 0, century: 0, batting_avg: 0.0, overs: 0, runs_given: 0, wickets: 0, maiden: 0, bowl_avg: 0, bowl_strike_rate: 0, eco: 0, four_fers: 0, five_fers: 0, captain: false, wk: false },
  { id: 66, name: "Player 11", short: "P11", role_id: 1, batting_rating: 9, bowling_rating: 0, matches: 0, innings: 0, runs: 0, balls: 0, fours: 0, sixes: 0, strike_rate: 0.0, half_century: 0, century: 0, batting_avg: 0.0, overs: 0, runs_given: 0, wickets: 0, maiden: 0, bowl_avg: 0, bowl_strike_rate: 0, eco: 0, four_fers: 0, five_fers: 0, captain: false, wk: false },

  { id: 67, name: "Player 1", short: "P1", role_id: 1, batting_rating: 9, bowling_rating: 0, matches: 0, innings: 0, runs: 0, balls: 0, fours: 0, sixes: 0, strike_rate: 0.0, half_century: 0, century: 0, batting_avg: 0.0, overs: 0, runs_given: 0, wickets: 0, maiden: 0, bowl_avg: 0, bowl_strike_rate: 0, eco: 0, four_fers: 0, five_fers: 0, captain: false, wk: false },
  { id: 68, name: "Player 2", short: "P2", role_id: 1, batting_rating: 9, bowling_rating: 0, matches: 0, innings: 0, runs: 0, balls: 0, fours: 0, sixes: 0, strike_rate: 0.0, half_century: 0, century: 0, batting_avg: 0.0, overs: 0, runs_given: 0, wickets: 0, maiden: 0, bowl_avg: 0, bowl_strike_rate: 0, eco: 0, four_fers: 0, five_fers: 0, captain: false, wk: false },
  { id: 69, name: "Player 3", short: "P3", role_id: 1, batting_rating: 9, bowling_rating: 0, matches: 0, innings: 0, runs: 0, balls: 0, fours: 0, sixes: 0, strike_rate: 0.0, half_century: 0, century: 0, batting_avg: 0.0, overs: 0, runs_given: 0, wickets: 0, maiden: 0, bowl_avg: 0, bowl_strike_rate: 0, eco: 0, four_fers: 0, five_fers: 0, captain: false, wk: false },
  { id: 70, name: "Player 4", short: "P4", role_id: 1, batting_rating: 9, bowling_rating: 0, matches: 0, innings: 0, runs: 0, balls: 0, fours: 0, sixes: 0, strike_rate: 0.0, half_century: 0, century: 0, batting_avg: 0.0, overs: 0, runs_given: 0, wickets: 0, maiden: 0, bowl_avg: 0, bowl_strike_rate: 0, eco: 0, four_fers: 0, five_fers: 0, captain: false, wk: false },
  { id: 71, name: "Player 5", short: "P5", role_id: 1, batting_rating: 9, bowling_rating: 0, matches: 0, innings: 0, runs: 0, balls: 0, fours: 0, sixes: 0, strike_rate: 0.0, half_century: 0, century: 0, batting_avg: 0.0, overs: 0, runs_given: 0, wickets: 0, maiden: 0, bowl_avg: 0, bowl_strike_rate: 0, eco: 0, four_fers: 0, five_fers: 0, captain: false, wk: false },
  { id: 72, name: "Player 6", short: "P6", role_id: 1, batting_rating: 9, bowling_rating: 0, matches: 0, innings: 0, runs: 0, balls: 0, fours: 0, sixes: 0, strike_rate: 0.0, half_century: 0, century: 0, batting_avg: 0.0, overs: 0, runs_given: 0, wickets: 0, maiden: 0, bowl_avg: 0, bowl_strike_rate: 0, eco: 0, four_fers: 0, five_fers: 0, captain: false, wk: false },
  { id: 73, name: "Player 7", short: "P7", role_id: 1, batting_rating: 9, bowling_rating: 0, matches: 0, innings: 0, runs: 0, balls: 0, fours: 0, sixes: 0, strike_rate: 0.0, half_century: 0, century: 0, batting_avg: 0.0, overs: 0, runs_given: 0, wickets: 0, maiden: 0, bowl_avg: 0, bowl_strike_rate: 0, eco: 0, four_fers: 0, five_fers: 0, captain: false, wk: false },
  { id: 74, name: "Player 8", short: "P8", role_id: 1, batting_rating: 9, bowling_rating: 0, matches: 0, innings: 0, runs: 0, balls: 0, fours: 0, sixes: 0, strike_rate: 0.0, half_century: 0, century: 0, batting_avg: 0.0, overs: 0, runs_given: 0, wickets: 0, maiden: 0, bowl_avg: 0, bowl_strike_rate: 0, eco: 0, four_fers: 0, five_fers: 0, captain: false, wk: false },
  { id: 75, name: "Player 9", short: "P9", role_id: 1, batting_rating: 9, bowling_rating: 0, matches: 0, innings: 0, runs: 0, balls: 0, fours: 0, sixes: 0, strike_rate: 0.0, half_century: 0, century: 0, batting_avg: 0.0, overs: 0, runs_given: 0, wickets: 0, maiden: 0, bowl_avg: 0, bowl_strike_rate: 0, eco: 0, four_fers: 0, five_fers: 0, captain: false, wk: false },
  { id: 76, name: "Player 10", short: "P10", role_id: 1, batting_rating: 9, bowling_rating: 0, matches: 0, innings: 0, runs: 0, balls: 0, fours: 0, sixes: 0, strike_rate: 0.0, half_century: 0, century: 0, batting_avg: 0.0, overs: 0, runs_given: 0, wickets: 0, maiden: 0, bowl_avg: 0, bowl_strike_rate: 0, eco: 0, four_fers: 0, five_fers: 0, captain: false, wk: false },
  { id: 77, name: "Player 11", short: "P11", role_id: 1, batting_rating: 9, bowling_rating: 0, matches: 0, innings: 0, runs: 0, balls: 0, fours: 0, sixes: 0, strike_rate: 0.0, half_century: 0, century: 0, batting_avg: 0.0, overs: 0, runs_given: 0, wickets: 0, maiden: 0, bowl_avg: 0, bowl_strike_rate: 0, eco: 0, four_fers: 0, five_fers: 0, captain: false, wk: false },

  { id: 78, name: "Player 1", short: "P1", role_id: 1, batting_rating: 9, bowling_rating: 0, matches: 0, innings: 0, runs: 0, balls: 0, fours: 0, sixes: 0, strike_rate: 0.0, half_century: 0, century: 0, batting_avg: 0.0, overs: 0, runs_given: 0, wickets: 0, maiden: 0, bowl_avg: 0, bowl_strike_rate: 0, eco: 0, four_fers: 0, five_fers: 0, captain: false, wk: false },
  { id: 79, name: "Player 2", short: "P2", role_id: 1, batting_rating: 9, bowling_rating: 0, matches: 0, innings: 0, runs: 0, balls: 0, fours: 0, sixes: 0, strike_rate: 0.0, half_century: 0, century: 0, batting_avg: 0.0, overs: 0, runs_given: 0, wickets: 0, maiden: 0, bowl_avg: 0, bowl_strike_rate: 0, eco: 0, four_fers: 0, five_fers: 0, captain: false, wk: false },
  { id: 80, name: "Player 3", short: "P3", role_id: 1, batting_rating: 9, bowling_rating: 0, matches: 0, innings: 0, runs: 0, balls: 0, fours: 0, sixes: 0, strike_rate: 0.0, half_century: 0, century: 0, batting_avg: 0.0, overs: 0, runs_given: 0, wickets: 0, maiden: 0, bowl_avg: 0, bowl_strike_rate: 0, eco: 0, four_fers: 0, five_fers: 0, captain: false, wk: false },
  { id: 81, name: "Player 4", short: "P4", role_id: 1, batting_rating: 9, bowling_rating: 0, matches: 0, innings: 0, runs: 0, balls: 0, fours: 0, sixes: 0, strike_rate: 0.0, half_century: 0, century: 0, batting_avg: 0.0, overs: 0, runs_given: 0, wickets: 0, maiden: 0, bowl_avg: 0, bowl_strike_rate: 0, eco: 0, four_fers: 0, five_fers: 0, captain: false, wk: false },
  { id: 82, name: "Player 5", short: "P5", role_id: 1, batting_rating: 9, bowling_rating: 0, matches: 0, innings: 0, runs: 0, balls: 0, fours: 0, sixes: 0, strike_rate: 0.0, half_century: 0, century: 0, batting_avg: 0.0, overs: 0, runs_given: 0, wickets: 0, maiden: 0, bowl_avg: 0, bowl_strike_rate: 0, eco: 0, four_fers: 0, five_fers: 0, captain: false, wk: false },
  { id: 83, name: "Player 6", short: "P6", role_id: 1, batting_rating: 9, bowling_rating: 0, matches: 0, innings: 0, runs: 0, balls: 0, fours: 0, sixes: 0, strike_rate: 0.0, half_century: 0, century: 0, batting_avg: 0.0, overs: 0, runs_given: 0, wickets: 0, maiden: 0, bowl_avg: 0, bowl_strike_rate: 0, eco: 0, four_fers: 0, five_fers: 0, captain: false, wk: false },
  { id: 84, name: "Player 7", short: "P7", role_id: 1, batting_rating: 9, bowling_rating: 0, matches: 0, innings: 0, runs: 0, balls: 0, fours: 0, sixes: 0, strike_rate: 0.0, half_century: 0, century: 0, batting_avg: 0.0, overs: 0, runs_given: 0, wickets: 0, maiden: 0, bowl_avg: 0, bowl_strike_rate: 0, eco: 0, four_fers: 0, five_fers: 0, captain: false, wk: false },
  { id: 85, name: "Player 8", short: "P8", role_id: 1, batting_rating: 9, bowling_rating: 0, matches: 0, innings: 0, runs: 0, balls: 0, fours: 0, sixes: 0, strike_rate: 0.0, half_century: 0, century: 0, batting_avg: 0.0, overs: 0, runs_given: 0, wickets: 0, maiden: 0, bowl_avg: 0, bowl_strike_rate: 0, eco: 0, four_fers: 0, five_fers: 0, captain: false, wk: false },
  { id: 86, name: "Player 9", short: "P9", role_id: 1, batting_rating: 9, bowling_rating: 0, matches: 0, innings: 0, runs: 0, balls: 0, fours: 0, sixes: 0, strike_rate: 0.0, half_century: 0, century: 0, batting_avg: 0.0, overs: 0, runs_given: 0, wickets: 0, maiden: 0, bowl_avg: 0, bowl_strike_rate: 0, eco: 0, four_fers: 0, five_fers: 0, captain: false, wk: false },
  { id: 87, name: "Player 10", short: "P10", role_id: 1, batting_rating: 9, bowling_rating: 0, matches: 0, innings: 0, runs: 0, balls: 0, fours: 0, sixes: 0, strike_rate: 0.0, half_century: 0, century: 0, batting_avg: 0.0, overs: 0, runs_given: 0, wickets: 0, maiden: 0, bowl_avg: 0, bowl_strike_rate: 0, eco: 0, four_fers: 0, five_fers: 0, captain: false, wk: false },
  { id: 88, name: "Player 11", short: "P11", role_id: 1, batting_rating: 9, bowling_rating: 0, matches: 0, innings: 0, runs: 0, balls: 0, fours: 0, sixes: 0, strike_rate: 0.0, half_century: 0, century: 0, batting_avg: 0.0, overs: 0, runs_given: 0, wickets: 0, maiden: 0, bowl_avg: 0, bowl_strike_rate: 0, eco: 0, four_fers: 0, five_fers: 0, captain: false, wk: false },

  { id: 89, name: "Player 1", short: "P1", role_id: 1, batting_rating: 9, bowling_rating: 0, matches: 0, innings: 0, runs: 0, balls: 0, fours: 0, sixes: 0, strike_rate: 0.0, half_century: 0, century: 0, batting_avg: 0.0, overs: 0, runs_given: 0, wickets: 0, maiden: 0, bowl_avg: 0, bowl_strike_rate: 0, eco: 0, four_fers: 0, five_fers: 0, captain: false, wk: false },
  { id: 90, name: "Player 2", short: "P2", role_id: 1, batting_rating: 9, bowling_rating: 0, matches: 0, innings: 0, runs: 0, balls: 0, fours: 0, sixes: 0, strike_rate: 0.0, half_century: 0, century: 0, batting_avg: 0.0, overs: 0, runs_given: 0, wickets: 0, maiden: 0, bowl_avg: 0, bowl_strike_rate: 0, eco: 0, four_fers: 0, five_fers: 0, captain: false, wk: false },
  { id: 91, name: "Player 3", short: "P3", role_id: 1, batting_rating: 9, bowling_rating: 0, matches: 0, innings: 0, runs: 0, balls: 0, fours: 0, sixes: 0, strike_rate: 0.0, half_century: 0, century: 0, batting_avg: 0.0, overs: 0, runs_given: 0, wickets: 0, maiden: 0, bowl_avg: 0, bowl_strike_rate: 0, eco: 0, four_fers: 0, five_fers: 0, captain: false, wk: false },
  { id: 92, name: "Player 4", short: "P4", role_id: 1, batting_rating: 9, bowling_rating: 0, matches: 0, innings: 0, runs: 0, balls: 0, fours: 0, sixes: 0, strike_rate: 0.0, half_century: 0, century: 0, batting_avg: 0.0, overs: 0, runs_given: 0, wickets: 0, maiden: 0, bowl_avg: 0, bowl_strike_rate: 0, eco: 0, four_fers: 0, five_fers: 0, captain: false, wk: false },
  { id: 93, name: "Player 5", short: "P5", role_id: 1, batting_rating: 9, bowling_rating: 0, matches: 0, innings: 0, runs: 0, balls: 0, fours: 0, sixes: 0, strike_rate: 0.0, half_century: 0, century: 0, batting_avg: 0.0, overs: 0, runs_given: 0, wickets: 0, maiden: 0, bowl_avg: 0, bowl_strike_rate: 0, eco: 0, four_fers: 0, five_fers: 0, captain: false, wk: false },
  { id: 94, name: "Player 6", short: "P6", role_id: 1, batting_rating: 9, bowling_rating: 0, matches: 0, innings: 0, runs: 0, balls: 0, fours: 0, sixes: 0, strike_rate: 0.0, half_century: 0, century: 0, batting_avg: 0.0, overs: 0, runs_given: 0, wickets: 0, maiden: 0, bowl_avg: 0, bowl_strike_rate: 0, eco: 0, four_fers: 0, five_fers: 0, captain: false, wk: false },
  { id: 95, name: "Player 7", short: "P7", role_id: 1, batting_rating: 9, bowling_rating: 0, matches: 0, innings: 0, runs: 0, balls: 0, fours: 0, sixes: 0, strike_rate: 0.0, half_century: 0, century: 0, batting_avg: 0.0, overs: 0, runs_given: 0, wickets: 0, maiden: 0, bowl_avg: 0, bowl_strike_rate: 0, eco: 0, four_fers: 0, five_fers: 0, captain: false, wk: false },
  { id: 96, name: "Player 8", short: "P8", role_id: 1, batting_rating: 9, bowling_rating: 0, matches: 0, innings: 0, runs: 0, balls: 0, fours: 0, sixes: 0, strike_rate: 0.0, half_century: 0, century: 0, batting_avg: 0.0, overs: 0, runs_given: 0, wickets: 0, maiden: 0, bowl_avg: 0, bowl_strike_rate: 0, eco: 0, four_fers: 0, five_fers: 0, captain: false, wk: false },
  { id: 97, name: "Player 9", short: "P9", role_id: 1, batting_rating: 9, bowling_rating: 0, matches: 0, innings: 0, runs: 0, balls: 0, fours: 0, sixes: 0, strike_rate: 0.0, half_century: 0, century: 0, batting_avg: 0.0, overs: 0, runs_given: 0, wickets: 0, maiden: 0, bowl_avg: 0, bowl_strike_rate: 0, eco: 0, four_fers: 0, five_fers: 0, captain: false, wk: false },
  { id: 98, name: "Player 10", short: "P10", role_id: 1, batting_rating: 9, bowling_rating: 0, matches: 0, innings: 0, runs: 0, balls: 0, fours: 0, sixes: 0, strike_rate: 0.0, half_century: 0, century: 0, batting_avg: 0.0, overs: 0, runs_given: 0, wickets: 0, maiden: 0, bowl_avg: 0, bowl_strike_rate: 0, eco: 0, four_fers: 0, five_fers: 0, captain: false, wk: false },
  { id: 99, name: "Player 11", short: "P11", role_id: 1, batting_rating: 9, bowling_rating: 0, matches: 0, innings: 0, runs: 0, balls: 0, fours: 0, sixes: 0, strike_rate: 0.0, half_century: 0, century: 0, batting_avg: 0.0, overs: 0, runs_given: 0, wickets: 0, maiden: 0, bowl_avg: 0, bowl_strike_rate: 0, eco: 0, four_fers: 0, five_fers: 0, captain: false, wk: false },

  { id: 100, name: "Player 1", short: "P1", role_id: 1, batting_rating: 9, bowling_rating: 0, matches: 0, innings: 0, runs: 0, balls: 0, fours: 0, sixes: 0, strike_rate: 0.0, half_century: 0, century: 0, batting_avg: 0.0, overs: 0, runs_given: 0, wickets: 0, maiden: 0, bowl_avg: 0, bowl_strike_rate: 0, eco: 0, four_fers: 0, five_fers: 0, captain: false, wk: false },
  { id: 101, name: "Player 2", short: "P2", role_id: 1, batting_rating: 9, bowling_rating: 0, matches: 0, innings: 0, runs: 0, balls: 0, fours: 0, sixes: 0, strike_rate: 0.0, half_century: 0, century: 0, batting_avg: 0.0, overs: 0, runs_given: 0, wickets: 0, maiden: 0, bowl_avg: 0, bowl_strike_rate: 0, eco: 0, four_fers: 0, five_fers: 0, captain: false, wk: false },
  { id: 102, name: "Player 3", short: "P3", role_id: 1, batting_rating: 9, bowling_rating: 0, matches: 0, innings: 0, runs: 0, balls: 0, fours: 0, sixes: 0, strike_rate: 0.0, half_century: 0, century: 0, batting_avg: 0.0, overs: 0, runs_given: 0, wickets: 0, maiden: 0, bowl_avg: 0, bowl_strike_rate: 0, eco: 0, four_fers: 0, five_fers: 0, captain: false, wk: false },
  { id: 103, name: "Player 4", short: "P4", role_id: 1, batting_rating: 9, bowling_rating: 0, matches: 0, innings: 0, runs: 0, balls: 0, fours: 0, sixes: 0, strike_rate: 0.0, half_century: 0, century: 0, batting_avg: 0.0, overs: 0, runs_given: 0, wickets: 0, maiden: 0, bowl_avg: 0, bowl_strike_rate: 0, eco: 0, four_fers: 0, five_fers: 0, captain: false, wk: false },
  { id: 104, name: "Player 5", short: "P5", role_id: 1, batting_rating: 9, bowling_rating: 0, matches: 0, innings: 0, runs: 0, balls: 0, fours: 0, sixes: 0, strike_rate: 0.0, half_century: 0, century: 0, batting_avg: 0.0, overs: 0, runs_given: 0, wickets: 0, maiden: 0, bowl_avg: 0, bowl_strike_rate: 0, eco: 0, four_fers: 0, five_fers: 0, captain: false, wk: false },
  { id: 105, name: "Player 6", short: "P6", role_id: 1, batting_rating: 9, bowling_rating: 0, matches: 0, innings: 0, runs: 0, balls: 0, fours: 0, sixes: 0, strike_rate: 0.0, half_century: 0, century: 0, batting_avg: 0.0, overs: 0, runs_given: 0, wickets: 0, maiden: 0, bowl_avg: 0, bowl_strike_rate: 0, eco: 0, four_fers: 0, five_fers: 0, captain: false, wk: false },
  { id: 106, name: "Player 7", short: "P7", role_id: 1, batting_rating: 9, bowling_rating: 0, matches: 0, innings: 0, runs: 0, balls: 0, fours: 0, sixes: 0, strike_rate: 0.0, half_century: 0, century: 0, batting_avg: 0.0, overs: 0, runs_given: 0, wickets: 0, maiden: 0, bowl_avg: 0, bowl_strike_rate: 0, eco: 0, four_fers: 0, five_fers: 0, captain: false, wk: false },
  { id: 107, name: "Player 8", short: "P8", role_id: 1, batting_rating: 9, bowling_rating: 0, matches: 0, innings: 0, runs: 0, balls: 0, fours: 0, sixes: 0, strike_rate: 0.0, half_century: 0, century: 0, batting_avg: 0.0, overs: 0, runs_given: 0, wickets: 0, maiden: 0, bowl_avg: 0, bowl_strike_rate: 0, eco: 0, four_fers: 0, five_fers: 0, captain: false, wk: false },
  { id: 108, name: "Player 9", short: "P9", role_id: 1, batting_rating: 9, bowling_rating: 0, matches: 0, innings: 0, runs: 0, balls: 0, fours: 0, sixes: 0, strike_rate: 0.0, half_century: 0, century: 0, batting_avg: 0.0, overs: 0, runs_given: 0, wickets: 0, maiden: 0, bowl_avg: 0, bowl_strike_rate: 0, eco: 0, four_fers: 0, five_fers: 0, captain: false, wk: false },
  { id: 109, name: "Player 10", short: "P10", role_id: 1, batting_rating: 9, bowling_rating: 0, matches: 0, innings: 0, runs: 0, balls: 0, fours: 0, sixes: 0, strike_rate: 0.0, half_century: 0, century: 0, batting_avg: 0.0, overs: 0, runs_given: 0, wickets: 0, maiden: 0, bowl_avg: 0, bowl_strike_rate: 0, eco: 0, four_fers: 0, five_fers: 0, captain: false, wk: false },
  { id: 110, name: "Player 11", short: "P11", role_id: 1, batting_rating: 9, bowling_rating: 0, matches: 0, innings: 0, runs: 0, balls: 0, fours: 0, sixes: 0, strike_rate: 0.0, half_century: 0, century: 0, batting_avg: 0.0, overs: 0, runs_given: 0, wickets: 0, maiden: 0, bowl_avg: 0, bowl_strike_rate: 0, eco: 0, four_fers: 0, five_fers: 0, captain: false, wk: false }
];
const venues = [
  { id: 1, name: "Wankhede Stadium" },
  { id: 2, name: "MA Chidambaram Stadium" },
  { id: 3, name: "M.Chinnaswamy Stadium" },
  { id: 4, name: "Eden Gardens" },
  { id: 5, name: "Arun Jaitley Stadium" },
  { id: 6, name: "Himachal Pradesh Cricket Association Stadium" },
  { id: 7, name: "Sawai Mansingh Stadium" },
  { id: 8, name: "Rajiv Gandhi International Stadium" },
  { id: 9, name: "Bharat Ratna Shri Atal Bihari Vajpayee Ekana Cricket Stadium" },
  { id: 10, name: "Narendra Modi Stadium" }
];
const schedule = [
  { id: 1, team1: 4, team2: 3, status: false, venue: 4 },
  { id: 2, team1: 8, team2: 7, status: false, venue: 8 },
  { id: 3, team1: 2, team2: 1, status: false, venue: 2 },
  { id: 4, team1: 5, team2: 9, status: false, venue: 5 },
  { id: 5, team1: 10, team2: 6, status: false, venue: 10 },
  { id: 6, team1: 7, team2: 4, status: false, venue: 7 },
  { id: 7, team1: 8, team2: 9, status: false, venue: 8 },
  { id: 8, team1: 2, team2: 3, status: false, venue: 2 },
  { id: 9, team1: 10, team2: 1, status: false, venue: 10 },
  { id: 10, team1: 5, team2: 8, status: false, venue: 5 },
  { id: 11, team1: 7, team2: 2, status: false, venue: 7 },
  { id: 12, team1: 1, team2: 4, status: false, venue: 1 },
  { id: 13, team1: 9, team2: 6, status: false, venue: 9 },
  { id: 14, team1: 3, team2: 10, status: false, venue: 3 },
  { id: 15, team1: 4, team2: 8, status: false, venue: 4 },
  { id: 16, team1: 9, team2: 1, status: false, venue: 9 },
  { id: 17, team1: 2, team2: 5, status: false, venue: 2 },
  { id: 18, team1: 6, team2: 7, status: false, venue: 6 },
  { id: 19, team1: 4, team2: 9, status: false, venue: 4 },
  { id: 20, team1: 8, team2: 10, status: false, venue: 8 },
  { id: 21, team1: 1, team2: 3, status: false, venue: 1 },
  { id: 22, team1: 6, team2: 2, status: false, venue: 6 },
  { id: 23, team1: 10, team2: 7, status: false, venue: 10 },
  { id: 24, team1: 3, team2: 5, status: false, venue: 3 },
  { id: 25, team1: 2, team2: 4, status: false, venue: 2 },
  { id: 26, team1: 9, team2: 10, status: false, venue: 9 },
  { id: 27, team1: 8, team2: 6, status: false, venue: 8 },
  { id: 28, team1: 7, team2: 3, status: false, venue: 7 },
  { id: 29, team1: 5, team2: 1, status: false, venue: 5 },
  { id: 30, team1: 9, team2: 2, status: false, venue: 9 },
  { id: 31, team1: 6, team2: 4, status: false, venue: 6 },
  { id: 32, team1: 5, team2: 7, status: false, venue: 5 },
  { id: 33, team1: 1, team2: 8, status: false, venue: 1 },
  { id: 34, team1: 3, team2: 6, status: false, venue: 3 },
  { id: 35, team1: 10, team2: 5, status: false, venue: 10 },
  { id: 36, team1: 7, team2: 9, status: false, venue: 7 },
  { id: 37, team1: 6, team2: 3, status: false, venue: 6 },
  { id: 38, team1: 1, team2: 2, status: false, venue: 1 },
  { id: 39, team1: 4, team2: 10, status: false, venue: 4 },
  { id: 40, team1: 9, team2: 5, status: false, venue: 9 },
  { id: 41, team1: 8, team2: 1, status: false, venue: 8 },
  { id: 42, team1: 3, team2: 7, status: false, venue: 3 },
  { id: 43, team1: 2, team2: 8, status: false, venue: 2 },
  { id: 44, team1: 4, team2: 6, status: false, venue: 4 },
  { id: 45, team1: 1, team2: 9, status: false, venue: 1 },
  { id: 46, team1: 5, team2: 3, status: false, venue: 5 },
  { id: 47, team1: 7, team2: 10, status: false, venue: 7 },
  { id: 48, team1: 5, team2: 4, status: false, venue: 5 },
  { id: 49, team1: 2, team2: 6, status: false, venue: 2 },
  { id: 50, team1: 7, team2: 1, status: false, venue: 7 },
  { id: 51, team1: 10, team2: 8, status: false, venue: 10 },
  { id: 52, team1: 3, team2: 2, status: false, venue: 3 },
  { id: 53, team1: 4, team2: 7, status: false, venue: 4 },
  { id: 54, team1: 6, team2: 9, status: false, venue: 6 },
  { id: 55, team1: 8, team2: 5, status: false, venue: 8 },
  { id: 56, team1: 1, team2: 10, status: false, venue: 1 },
  { id: 57, team1: 4, team2: 2, status: false, venue: 4 },
  { id: 58, team1: 6, team2: 5, status: false, venue: 6 },
  { id: 59, team1: 9, team2: 3, status: false, venue: 9 },
  { id: 60, team1: 8, team2: 4, status: false, venue: 8 },
  { id: 61, team1: 6, team2: 1, status: false, venue: 6 },
  { id: 62, team1: 5, team2: 10, status: false, venue: 5 },
  { id: 63, team1: 2, team2: 7, status: false, venue: 2 },
  { id: 64, team1: 3, team2: 8, status: false, venue: 3 },
  { id: 65, team1: 10, team2: 9, status: false, venue: 10 },
  { id: 66, team1: 1, team2: 5, status: false, venue: 1 },
  { id: 67, team1: 7, team2: 6, status: false, venue: 7 },
  { id: 68, team1: 3, team2: 4, status: false, venue: 3 },
  { id: 69, team1: 10, team2: 2, status: false, venue: 10 },
  { id: 70, team1: 9, team2: 8, status: false, venue: 9 }
];

// ... (keep all your existing data arrays)



// ... (keep all your existing data arrays)

function Teams() {
  const navigate = useNavigate();
  const [selectedTeam, setSelectedTeam] = useState(1);
  const videoRef = useRef(null);
  useEffect(() => {
    document.title = "IPL - Select Team";
    if (videoRef.current) {
      videoRef.current.addEventListener('ended', () => {
        videoRef.current.play();
      });
    }
  }, []);

  const cricketData = {
    selectedTeam: selectedTeam,
    teams: teams,
    players: players,
    venues: venues,
    schedule: schedule
  };

  function handleNext() {
    localStorage.setItem('status', true);
    localStorage.setItem('cricketData', JSON.stringify(cricketData));
    navigate('/schedule');
  }

  // Team logos and colors mapping
  const teamData = {
    1: { 
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/c/cd/Mumbai_Indians_Logo.svg/1200px-Mumbai_Indians_Logo.svg.png",
      color: "#004ba0" // Mumbai Indians blue
    },
    2: { 
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/2/2b/Chennai_Super_Kings_Logo.svg/1200px-Chennai_Super_Kings_Logo.svg.png",
      color: "yellow" // CSK yellow
    },
    3: { 
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/d/d4/Royal_Challengers_Bengaluru_Logo.svg/1200px-Royal_Challengers_Bengaluru_Logo.svg.png",
      color: "#ec1c24" // RCB red
    },
    4: { 
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/4/4c/Kolkata_Knight_Riders_Logo.svg/1200px-Kolkata_Knight_Riders_Logo.svg.png",
      color: "#3a225d" // KKR purple
    },
    5: { 
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/2/2f/Delhi_Capitals.svg/1200px-Delhi_Capitals.svg.png",
      color: "rgb(40, 41, 104)" // DC blue
    },
    6: { 
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/d/d4/Punjab_Kings_Logo.svg/1200px-Punjab_Kings_Logo.svg.png",
      color: "#aa4545" // PBKS red
    },
    7: { 
      logo: "https://upload.wikimedia.org/wikipedia/hi/thumb/6/60/Rajasthan_Royals_Logo.svg/1200px-Rajasthan_Royals_Logo.svg.png",
      color: "rgb(230, 6, 147)" // RR blue
    },
    8: { 
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/5/51/Sunrisers_Hyderabad_Logo.svg/1200px-Sunrisers_Hyderabad_Logo.svg.png",
      color: "#fb643e" // SRH orange
    },
    9: { 
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a9/Lucknow_Super_Giants_IPL_Logo.svg/1200px-Lucknow_Super_Giants_IPL_Logo.svg.png",
      color: "#00a6b0" // LSG teal
    },
    10: { 
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/0/09/Gujarat_Titans_Logo.svg/1200px-Gujarat_Titans_Logo.svg.png",
      color: "rgb(27, 33, 51)" // GT orange
    }
  };

  const firstRowTeams = teams.slice(0, 5);
  const secondRowTeams = teams.slice(5, 10);

  return (
    <div className={styles.container}>
      
      {/* <div className={styles.videoContainer}>
        <video
          ref={videoRef}
          className={styles.videoBackground}
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={vid} type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>
        <div className={styles.videoOverlay}></div>
      </div> */}

      <div className={styles.teamsRow}>
        {firstRowTeams.map(team => (
          <div 
            key={team.id} 
            className={`${styles.teamCard} ${selectedTeam === team.id ? styles.selected : ''}`}
            onClick={() => setSelectedTeam(team.id)}
            style={{
              backgroundColor: selectedTeam === team.id ? `${teamData[team.id].color}` : '#f8f9fa',
              borderColor: selectedTeam === team.id ? teamData[team.id].color : 'transparent'
            }}
          >
            <img
              src={teamData[team.id].logo}
              alt={team.name}
              className={styles.teamLogo}
            />
            <div 
              className={styles.teamName}
              style={{ color: selectedTeam === team.id ? '#fff' : '#333' }}
            >
              {team.short}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.teamsRow}>
        {secondRowTeams.map(team => (
          <div 
            key={team.id} 
            className={`${styles.teamCard} ${selectedTeam === team.id ? styles.selected : ''}`}
            onClick={() => setSelectedTeam(team.id)}
            style={{
              backgroundColor: selectedTeam === team.id ? `${teamData[team.id].color}` : '#f8f9fa',
              borderColor: selectedTeam === team.id ? teamData[team.id].color : 'transparent'
            }}
          >
            <img
              src={teamData[team.id].logo}
              alt={team.name}
              className={styles.teamLogo}
            />
            <div 
              className={styles.teamName}
              style={{ color: selectedTeam === team.id ? '#fff' : '#333' }}
            >
              {team.short}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.nextButtonContainer}>
        <button 
          className={styles.nextButton} 
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Teams;