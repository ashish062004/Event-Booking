const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

// Create a canvas and context
const canvas = createCanvas(600, 300);
const ctx = canvas.getContext('2d');

// Draw a background
ctx.fillStyle = '#FFF';
ctx.fillRect(0, 0, 600, 300);

// Draw a border
ctx.strokeStyle = '#000';
ctx.lineWidth = 2;
ctx.strokeRect(0, 0, 600, 300);

// Draw some text for the ticket template
ctx.fillStyle = '#000';
ctx.font = 'bold 30px Arial';
ctx.fillText('Event Ticket', 200, 50);

ctx.font = '20px Arial';
ctx.fillText('Event:', 50, 100);
ctx.fillText('User:', 50, 150);
ctx.fillText('ID:', 50, 200);

// Save the canvas as a PNG file
const buffer = canvas.toBuffer('image/png');
const templatePath = path.join(__dirname, 'ticket_template.png');
fs.writeFileSync(templatePath, buffer);

console.log('Ticket template created at', templatePath);
