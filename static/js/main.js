document.addEventListener('DOMContentLoaded', function() {
    const textInput = document.getElementById('textInput');
    const analyzeBtn = document.getElementById('analyzeBtn');
    const resultDiv = document.getElementById('result');
    const loadingDiv = document.getElementById('loading');
    const sentimentText = document.getElementById('sentimentText');
    const confidenceText = document.getElementById('confidenceText');

    analyzeBtn.addEventListener('click', async function() {
        const text = textInput.value.trim();
        
        if (!text) {
            alert('Please enter some text to analyze');
            return;
        }

        // Show loading spinner
        loadingDiv.style.display = 'block';
        resultDiv.style.display = 'none';

        try {
            const response = await fetch('/analyze', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: text })
            });

            const data = await response.json();

            if (response.ok) {
                // Update result display
                sentimentText.textContent = `Sentiment: ${data.sentiment}`;
                confidenceText.textContent = `Confidence: ${(data.confidence * 100).toFixed(2)}%`;
                
                // Style the result based on sentiment
                resultDiv.querySelector('.alert').className = `alert alert-${data.sentiment === 'POSITIVE' ? 'success' : 'danger'}`;
                
                resultDiv.style.display = 'block';
            } else {
                throw new Error(data.error || 'An error occurred');
            }
        } catch (error) {
            alert('Error: ' + error.message);
        } finally {
            loadingDiv.style.display = 'none';
        }
    });
}); 