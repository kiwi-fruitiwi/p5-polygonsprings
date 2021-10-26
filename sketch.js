/*
@author Kiwi
@date 2021-10-26

Trying to recreate Simon's polygon spring demo, but with comments. This is
 attempt #2!

patterns used
    loop all, then loop other
    gravityForce method

🔧 step by step 🔧
.   particle class inside sketch.js
.   particles with applyForce, update, render, dampen (scaleVelocity)
        add dampen
    .   test generating random particles across the screen with initial y
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
    add mouseClicked to set particles[0]'s pos
    add 3D
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

    for (let i=0; i<TOTAL; i++) {
        particles.push(new Particle(0, 0))
    }

    console.log("🐳 particles created :3")
}

function draw() {
    background(234, 34, 24)
    stroke(0, 0, 100)
    fill(0, 0, 100, 20)

    particles.forEach(p => {
        p.applyForce(gravityForce(0.1))
        p.update()
    })
    particles.forEach(p => p.render())
}


// calculate the spring force based on Hooke's Law
function springForce(a, b, restLength, k) {

}


function gravityForce(strength) {
    return new p5.Vector(0, strength)
}

class Particle {
    constructor(x, y) {
        this.pos = new p5.Vector(random(width), random(height))
        this.vel = p5.Vector.random2D()
        this.acc = new p5.Vector()
        this.target = new p5.Vector(x, y)

        this.r = 8
        this.maxspeed = 10
        this.maxforce = 1
    }

    applyForce(force) {
        this.acc.add(force)
    }

    update() {
        this.vel.add(this.acc)
        this.pos.add(this.vel)
        this.acc.mult(0)
    }

    render() {
        circle(this.pos.x, this.pos.y, this.r*2)
    }

    // like seek, but we slow down as we approach our target :3
    arrive(target) {
        // this gives you a vector pointing from us to the target
        let desired = p5.Vector.sub(target, this.pos)

        // the distance between two points is the magnitude of the
        // vector from one to the other
        let distance = desired.mag()

        let speed = this.maxspeed
        if (distance < 100) {
            speed = map(distance, 0, 100, 0, this.maxspeed)
        }

        desired.setMag(speed)

        // steering = desired - current
        let steer = p5.Vector.sub(desired, this.vel)

        return steer.limit(this.maxforce)
    }
}