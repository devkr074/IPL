import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
const teams = [
  { id: 1, name: 'Mumbai Indians', short: "MI", matches: 0, won: 0, lost: 0, tied: 0, nr: 0, point: 0, nrr: 0.0 },
  { id: 2, name: 'Chennai Super Kings', short: "CSK", matches: 0, won: 0, lost: 0, tied: 0, nr: 0, point: 0, nrr: 0.0 },
  { id: 3, name: 'Royal Challengers Bangalore', short: "RCB", matches: 0, won: 0, lost: 0, tied: 0, nr: 0, point: 0, nrr: 0.0 },
  { id: 4, name: 'Kolkata Knight Riders', short: "KKR", matches: 0, won: 0, lost: 0, tied: 0, nr: 0, point: 0, nrr: 0.0 },
  { id: 5, name: 'Delhi Capitals', short: "DC", matches: 0, won: 0, lost: 0, tied: 0, nr: 0, point: 0, nrr: 0.0 },
  { id: 6, name: 'Punjab Kings', short: "PKB", matches: 0, won: 0, lost: 0, tied: 0, nr: 0, point: 0, nrr: 0.0 },
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

const venue = [
  { id: 1, name: "Mumbai" },
  { id: 2, name: "Chennai" },
  { id: 3, name: "Banglore" },
  { id: 4, name: "Kolkata" },
  { id: 5, name: "Delhi" },
  { id: 6, name: "Punjab" },
  { id: 7, name: "Rajasthan" },
  { id: 8, name: "Hyderabad" },
  { id: 9, name: "Lucknow" },
  { id: 10, name: "Gujarat" }
];

const schedule = [
  { id: 1, team1: 4, team2: 3,status:false, venue: 4 },
  { id: 2, team1: 8, team2: 7,status:false, venue: 8 },
  { id: 3, team1: 1, team2: 2,status:false, venue: 2 },
  { id: 4, team1: 5, team2: 9,status:false, venue: 5 },
  { id: 5, team1: 10, team2: 6,status:false, venue: 10 },
  { id: 6, team1: 7, team2: 4,status:false, venue: 7 },
  { id: 7, team1: 8, team2: 9,status:false, venue: 8 },
  { id: 8, team1: 2, team2: 3,status:false, venue: 2 },
  { id: 9, team1: 2, team2: 3,status:false, venue: 2 }
];



function TeamSelection() {
  const navigate = useNavigate();
  const [selectedTeam, setSelectedTeam] = useState(1);
  useEffect(() => {
    document.title = "IPL 2025 - Select Your Team"
  }, []);


  const cricketData = {
    selectedTeam: selectedTeam,
    teams: teams,
    players: players,
    venue: venue,
    schedule: schedule
  };

  const handleNext = () => {
    localStorage.setItem('status', true);
    localStorage.setItem('cricketData', JSON.stringify(cricketData));
    const storedData = JSON.parse(localStorage.getItem('cricketData'));
    const storedTeams = storedData.teams;
    const storedPlayers = storedData.players;
    console.log(storedTeams);
    console.log(storedPlayers);
    navigate('/schedule');
  };
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Select Your Team</h2>
      <Form>
        {teams.map(team => (
          <Form.Check
            key={team.id}
            type="radio"
            id={`team-${team.id}`}
            label={team.name}
            name="teamSelection"
            checked={selectedTeam === team.id}
            onChange={() => setSelectedTeam(team.id)}
          />
        ))}
      </Form>
      <div className="text-center mt-4">
        <Button variant="primary" onClick={handleNext}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default TeamSelection;