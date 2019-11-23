import Vector from '../vendor/Vector.js'

export default function rotateVector(vector, angle) {
    angle = -angle * (Math.PI/180);
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return new Vector(vector.x * cos - vector.y * sin, vector.x * sin + vector.y * cos, vector.z);
}