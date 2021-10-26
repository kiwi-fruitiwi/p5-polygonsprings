/*
@author Kiwi
@date 2021-10-26

Trying to recreate Simon's polygon spring demo, but with comments. This is
 attempt #2!

patterns used
    loop all, then loop other
    gravityForce method

🔧 step by step 🔧
    particle class inside sketch.js
    particles with applyForce, update, render, dampen (scaleVelocity)
        test generating random particles across the screen with initial y
        velocity ➜ apply gravity
    edges() without this.r. if/else
        make sure this works with many particles before adding this.r
    create particles in circle using polar coordinates, r=42, map [0 ➜ 2π]
    connect all particles with lines using nested loops
        for (const p of particles) {
            for (const other of particles) {
    spring force method
        if (p !== other)
            p.applyForce(springForce(p, other, RL=150, K=0.05))

TODO
    🌟 limit velocity
    add mouseClicked to set particles[0]'s pos
    compare to x-parasite!
    figure out why things stick to the floor
    🌟 add this.r to edges()
    add 3D?
 */

let font
let particles = []
const TOTAL = 6
const K = 0.05

function preload() {
    font = loadFont('fonts/Meiryo-01.ttf')
}

function setup() {
    createCanvas(640, 360)
    colorMode(HSB, 360, 100, 100, 100)

    const r = 42
    console.log("🐳 particles created :3")
}

function draw() {
    background(234, 34, 24)
    stroke(0, 0, 100, 70)

}


// calculate the spring force based on Hooke's Law
function springForce(a, b, restLength, k) {

}


function gravityForce(strength) {

}
