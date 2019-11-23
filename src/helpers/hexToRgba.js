export default function hexToRGB(hex, alpha = 1.0) {
    var red = parseInt(hex.slice(1, 3), 16) / 255,
        green = parseInt(hex.slice(3, 5), 16) / 255,
        blue = parseInt(hex.slice(5, 7), 16) / 255;

    return {r: red, g: green, b: blue, a: alpha};
}