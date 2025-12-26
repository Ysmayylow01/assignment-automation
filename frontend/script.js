const API_URL = 'http://localhost:5000/api';

// Tab switching
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        const targetTab = tab.dataset.tab;
        
        // Remove active class from all tabs and contents
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked tab and corresponding content
        tab.classList.add('active');
        document.getElementById(targetTab).classList.add('active');
        
        // Hide result card when switching tabs
        document.getElementById('resultCard').style.display = 'none';
    });
});

// Generate form submission
document.getElementById('generateForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const topic = document.getElementById('topic').value;
    const type = document.getElementById('assignmentType').value;
    const wordCount = parseInt(document.getElementById('wordCount').value);
    const language = document.getElementById('language').value;
    
    const generateBtn = document.getElementById('generateBtn');
    const loading = document.getElementById('loading');
    const resultCard = document.getElementById('resultCard');
    
    // Show loading, hide result
    loading.style.display = 'block';
    resultCard.style.display = 'none';
    generateBtn.disabled = true;
    
    try {
        const response = await fetch(`${API_URL}/generate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                topic,
                type,
                wordCount,
                language
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            displayResult(data.content);
        } else {
            alert('Ýalňyşlyk ýüze çykdy: ' + (data.error || 'Näbelli ýalňyşlyk'));
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Ulgama birigip bolmady. Backend işleýändigini barlaň.');
    } finally {
        loading.style.display = 'none';
        generateBtn.disabled = false;
    }
});

// Improve form submission
document.getElementById('improveForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const text = document.getElementById('originalText').value;
    const improvementType = document.getElementById('improvementType').value;
    
    const improveBtn = document.getElementById('improveBtn');
    const loading = document.getElementById('loading');
    const resultCard = document.getElementById('resultCard');
    
    // Show loading, hide result
    loading.style.display = 'block';
    resultCard.style.display = 'none';
    improveBtn.disabled = true;
    
    try {
        const response = await fetch(`${API_URL}/improve`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                text,
                improvementType
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            displayResult(data.improvedText);
        } else {
            alert('Ýalňyşlyk ýüze çykdy: ' + (data.error || 'Näbelli ýalňyşlyk'));
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Ulgama birigip bolmady. Backend işleýändigini barlaň.');
    } finally {
        loading.style.display = 'none';
        improveBtn.disabled = false;
    }
});

// Format markdown/text to HTML
function formatTextToHTML(text) {
    // Store original text
    let original = text;
    
    // Remove code blocks markers (```language and ```)
    text = text.replace(/```[\w]*\n/g, '').replace(/```/g, '');
    
    // Remove extra spaces and clean up
    text = text.trim();
    
    // Convert headers (must be in order: h3, h2, h1 to avoid conflicts)
    // Support both ### and **Header** style
    text = text.replace(/^###\s*\*\*(.*?)\*\*\s*$/gim, '<h3>$1</h3>');
    text = text.replace(/^###\s*(.*?)$/gim, '<h3>$1</h3>');
    text = text.replace(/^##\s*\*\*(.*?)\*\*\s*$/gim, '<h2>$1</h2>');
    text = text.replace(/^##\s*(.*?)$/gim, '<h2>$1</h2>');
    text = text.replace(/^#\s*\*\*(.*?)\*\*\s*$/gim, '<h1>$1</h1>');
    text = text.replace(/^#\s*(.*?)$/gim, '<h1>$1</h1>');
    
    // Convert bold (before italic to avoid conflicts)
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    text = text.replace(/__(.*?)__/g, '<strong>$1</strong>');
    
    // Convert italic
    text = text.replace(/\*([^\*\n]+)\*/g, '<em>$1</em>');
    text = text.replace(/_([^_\n]+)_/g, '<em>$1</em>');
    
    // Convert numbered lists with preserved content
    text = text.replace(/^(\d+)\.\s+\*\*(.*?)\*\*\s*–\s*(.*?)$/gim, '<li><strong>$2</strong> – $3</li>');
    text = text.replace(/^(\d+)\.\s+(.*?)$/gim, '<li>$2</li>');
    
    // Convert unordered lists
    text = text.replace(/^\*\s+(.*?)$/gim, '<li>$1</li>');
    text = text.replace(/^-\s+(.*?)$/gim, '<li>$1</li>');
    
    // Wrap consecutive list items in ul/ol tags
    text = text.replace(/(<li>.*?<\/li>\s*)+/g, function(match) {
        return '<ul>' + match + '</ul>';
    });
    
    // Convert inline code
    text = text.replace(/`([^`]+)`/g, '<code>$1</code>');
    
    // Convert links
    text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>');
    
    // Split into blocks (separated by multiple newlines)
    const blocks = text.split(/\n\s*\n+/);
    
    // Process each block
    text = blocks.map(block => {
        block = block.trim();
        if (!block) return '';
        
        // Skip if already HTML tagged
        if (block.startsWith('<h') || block.startsWith('<ul') || 
            block.startsWith('<ol') || block.startsWith('<div')) {
            return block;
        }
        
        // Wrap in paragraph
        return '<p>' + block.replace(/\n/g, '<br>') + '</p>';
    }).filter(block => block).join('\n\n');
    
    // Remove horizontal rules (---)
    text = text.replace(/^---+$/gm, '<hr>');
    
    // Clean up extra whitespace
    text = text.replace(/\n{3,}/g, '\n\n');
    
    return text;
}

// Display result with formatted HTML
function displayResult(content) {
    const resultCard = document.getElementById('resultCard');
    const resultContent = document.getElementById('resultContent');
    
    // Format the content to HTML
    const formattedHTML = formatTextToHTML(content);
    resultContent.innerHTML = formattedHTML;
    
    // Store raw content for copy/download
    resultContent.dataset.rawContent = content;
    
    resultCard.style.display = 'block';
    
    // Scroll to result
    resultCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Copy to clipboard (raw text)
document.getElementById('copyBtn').addEventListener('click', () => {
    const resultContent = document.getElementById('resultContent');
    const rawContent = resultContent.dataset.rawContent || resultContent.textContent;
    
    navigator.clipboard.writeText(rawContent).then(() => {
        const copyBtn = document.getElementById('copyBtn');
        const originalHTML = copyBtn.innerHTML;
        
        copyBtn.innerHTML = `
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"/>
            </svg>
            Göçürildi!
        `;
        
        setTimeout(() => {
            copyBtn.innerHTML = originalHTML;
        }, 2000);
    }).catch(err => {
        alert('Göçürilmedi: ' + err);
    });
});

// Download as text file (raw text)
document.getElementById('downloadBtn').addEventListener('click', () => {
    const resultContent = document.getElementById('resultContent');
    const rawContent = resultContent.dataset.rawContent || resultContent.textContent;
    
    const blob = new Blob([rawContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    
    a.href = url;
    a.download = `assignment_${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});