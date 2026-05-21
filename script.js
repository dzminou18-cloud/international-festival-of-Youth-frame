const canvas = new fabric.Canvas('main-canvas', {
    isDrawingMode: false,
    enableRetinaScaling: true
});

let currentUserImg = null;

// Load frame overlay image
fabric.Image.fromURL('frame.png', function(img) {
    img.scaleToWidth(350);
    canvas.setOverlayImage(img, canvas.renderAll.bind(canvas), { 
        originX: 'left', 
        originY: 'top' 
    });
}, { crossOrigin: 'anonymous' });

// Handle photo input
document.getElementById('photo-input').onchange = function(e) {
    const reader = new FileReader();
    reader.onload = function(event) {
        fabric.Image.fromURL(event.target.result, function(img) {
            // Remove previous image if exists
            if (currentUserImg) {
                canvas.remove(currentUserImg);
            }
            
            img.scaleToWidth(250);
            img.set({ 
                left: 175, 
                top: 175, 
                originX: 'center', 
                originY: 'center',
                selectable: true,
                evented: true
            });
            
            canvas.add(img);
            canvas.setActiveObject(img);
            currentUserImg = img;
            img.sendToBack();
            canvas.renderAll();
        }, { crossOrigin: 'anonymous' });
    };
    reader.readAsDataURL(e.target.files[0]);
};

// Rotate button functionality
document.getElementById('rotate-btn').onclick = () => {
    if (currentUserImg) {
        currentUserImg.rotate((currentUserImg.angle + 90) % 360);
        canvas.renderAll();
    }
};

// Clear/Remove button functionality
document.getElementById('clear-btn').onclick = () => {
    if (currentUserImg) {
        canvas.remove(currentUserImg);
        currentUserImg = null;
        canvas.renderAll();
    }
};

// Save/Download button functionality
document.getElementById('save-btn').onclick = () => {
    const link = document.createElement('a');
    link.download = 'Festival_Youth_2026.png';
    link.href = canvas.toDataURL({ 
        format: 'png', 
        multiplier: 2,
        enableRetinaScaling: true
    });
    link.click();
};

// Canvas event listeners for better interaction
canvas.on('object:scaling', function() {
    canvas.renderAll();
});

canvas.on('object:rotating', function() {
    canvas.renderAll();
});

canvas.on('object:moving', function() {
    canvas.renderAll();
});