<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ChabadOne Builder Elite</title>
    
    <script src="https://cdn.tailwindcss.com"></script>
    
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    
    <script src="https://unpkg.com/lucide@0.344.0/dist/umd/lucide.min.js"></script>
</head>
<body class="bg-stone-50">
    <div id="root"></div>

    <script type="text/babel">
        // Deconstruct React Hooks
        const { useState, useEffect } = React;

        // Simple Icon Component for Lucide
        const Icon = ({ name, size = 16, className = "" }) => {
            const [svg, setSvg] = useState("");
            
            useEffect(() => {
                // Initialize lucide icons after render
                if (window.lucide) {
                    window.lucide.createIcons();
                }
            }, []);

            // Map icon names to lucide attributes
            return <i data-lucide={name} style={{width: size, height: size}} className={className}></i>;
        };

        const App = () => {
            const [blocks, setBlocks] = useState([
                { id: '1', type: 'header', title: 'Community Event', subtitle: 'Join us for an inspiring experience' },
                { id: '2', type: 'image-text', imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80', text: 'Welcome to our community page. This designer allows you to build beautiful, responsive layouts for your ChabadOne site.', layout: 'left' },
                { id: '3', type: 'button', label: 'Register Now', link: '#', style: 'pill' }
            ]);
            
            const [primaryColor, setPrimaryColor] = useState('#2c3e50');
            const [accentColor, setAccentColor] = useState('#e67e22');
            const [bgColor, setBgColor] = useState('#f4f4f4');
            const [bootstrapTheme, setBootstrapTheme] = useState('3.3.7'); 
            const [activeTab, setActiveTab] = useState('edit');
            const [editingBlockId, setEditingBlockId] = useState(null);
            const [copied, setCopied] = useState(false);

            const bootstrapLinks = {
                '3.3.7': 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css',
                'paper': 'https://cdnjs.cloudflare.com/ajax/libs/bootswatch/3.3.7/paper/bootstrap.min.css',
                'journal': 'https://cdnjs.cloudflare.com/ajax/libs/bootswatch/3.3.7/journal/bootstrap.min.css',
                'lumen': 'https://cdnjs.cloudflare.com/ajax/libs/bootswatch/3.3.7/lumen/bootstrap.min.css',
                'flatly': 'https://cdnjs.cloudflare.com/ajax/libs/bootswatch/3.3.7/flatly/bootstrap.min.css'
            };

            // --- Logic remains identical to your React code ---
            const addBlock = (type) => {
                const newBlock = {
                    id: Math.random().toString(36).substr(2, 9),
                    type,
                    ...(type === 'header' && { title: 'New Section', subtitle: 'Description' }),
                    ...(type === 'image-text' && { imageUrl: 'https://via.placeholder.com/800x400', text: 'Edit text here.', layout: 'left' }),
                    ...(type === 'button' && { label: 'Click Here', link: '#', style: 'pill' }),
                    ...(type === 'quote' && { text: 'Inspiring quote.' }),
                    ...(type === 'grid' && { items: [{title: 'One', desc: 'Detail'}, {title: 'Two', desc: 'Detail'}, {title: 'Three', desc: 'Detail'}] })
                };
                setBlocks([...blocks, newBlock]);
            };

            const removeBlock = (id) => setBlocks(blocks.filter(b => b.id !== id));
            const updateBlock = (id, field, value) => setBlocks(blocks.map(b => b.id === id ? { ...b, [field]: value } : b));
            const moveBlock = (index, direction) => {
                const newBlocks = [...blocks];
                const targetIndex = index + direction;
                if (targetIndex < 0 || targetIndex >= newBlocks.length) return;
                [newBlocks[index], newBlocks[targetIndex]] = [newBlocks[targetIndex], newBlocks[index]];
                setBlocks(newBlocks);
            };

            const generateBlockHTML = (block) => {
                switch (block.type) {
                    case 'header': return `<div style="background: linear-gradient(135deg, ${bgColor} 0%, #fff 100%); text-align: center; padding: 80px 20px; border-radius: 20px; margin-bottom: 30px; border: 1px solid rgba(0,0,0,0.05);"><h1 style="font-family: 'Playfair Display', serif; font-size: 3.5rem; color: ${primaryColor}; margin: 0; font-weight: 700;">${block.title}</h1><div style="font-style: italic; color: ${accentColor}; font-size: 1.3rem; margin-top: 15px;">${block.subtitle}</div></div>`;
                    case 'image-text': return `<div class="container-fluid" style="margin-bottom: 40px;"><div class="row" style="display: flex; flex-direction: ${block.layout === 'right' ? 'row-reverse' : 'row'}; align-items: center;"><div class="col-md-5"><img src="${block.imageUrl}" style="border-radius: 12px; width: 100%; box-shadow: 0 15px 35px rgba(0,0,0,0.1);"></div><div class="col-md-7" style="padding: 20px; font-size: 1.15rem; line-height: 1.8;">${block.text}</div></div></div>`;
                    case 'button': return `<div style="text-align: center; margin: 40px 0;"><a href="${block.link}" style="background: ${primaryColor}; color: #fff; padding: 16px 45px; text-decoration: none; border-radius: ${block.style === 'pill' ? '50px' : '4px'}; display: inline-block; font-weight: 600;">${block.label}</a></div>`;
                    case 'quote': return `<div style="padding: 40px; border-left: 6px solid ${accentColor}; background: ${bgColor}; margin: 40px 0; font-size: 1.8rem; text-align: center; border-radius: 0 15px 15px 0;">"${block.text}"</div>`;
                    default: return '';
                }
            };

            const fullOutput = `<style>@import url('${bootstrapLinks[bootstrapTheme]}');</style>\n<div class="fancy-wrapper">\n${blocks.map(b => generateBlockHTML(b)).join('\n')}\n</div>`;

            const copyToClipboard = () => {
                navigator.clipboard.writeText(fullOutput);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            };

            return (
                <div className="min-h-screen flex flex-col font-sans text-stone-800">
                    <header className="bg-stone-900 text-white p-4 flex justify-between items-center sticky top-0 z-50">
                        <h1 className="text-xl font-bold flex items-center gap-2">
                             ChabadOne Builder <span className="text-amber-500">Elite</span>
                        </h1>
                        <div className="flex bg-stone-800 rounded-lg p-1">
                            <button onClick={() => setActiveTab('edit')} className={`px-4 py-1 rounded ${activeTab === 'edit' ? 'bg-amber-600' : ''}`}>Design</button>
                            <button onClick={() => setActiveTab('code')} className={`px-4 py-1 rounded ${activeTab === 'code' ? 'bg-amber-600' : ''}`}>Export</button>
                        </div>
                    </header>

                    <main className="flex-1 flex overflow-hidden h-[calc(100vh-64px)]">
                        <aside className="w-80 bg-white border-r overflow-y-auto p-6">
                            <div className="mb-6">
                                <label className="text-[10px] font-bold uppercase text-stone-400">Theme Base</label>
                                <select value={bootstrapTheme} onChange={(e) => setBootstrapTheme(e.target.value)} className="w-full p-2 border rounded mt-1">
                                    <option value="3.3.7">Bootstrap 3.3.7</option>
                                    <option value="paper">Paper</option>
                                    <option value="journal">Journal</option>
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-2 mb-6">
                                <button onClick={() => addBlock('header')} className="p-2 border rounded text-xs font-bold hover:bg-stone-50">BANNER</button>
                                <button onClick={() => addBlock('image-text')} className="p-2 border rounded text-xs font-bold hover:bg-stone-50">IMG+TXT</button>
                                <button onClick={() => addBlock('button')} className="p-2 border rounded text-xs font-bold hover:bg-stone-50">BUTTON</button>
                                <button onClick={() => addBlock('quote')} className="p-2 border rounded text-xs font-bold hover:bg-stone-50">QUOTE</button>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-xs font-bold">Primary</span>
                                    <input type="color" value={primaryColor} onChange={e => setPrimaryColor(e.target.value)} />
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-xs font-bold">Accent</span>
                                    <input type="color" value={accentColor} onChange={e => setAccentColor(e.target.value)} />
                                </div>
                            </div>
                        </aside>

                        <section className="flex-1 bg-stone-100 p-8 overflow-y-auto">
                            {activeTab === 'edit' ? (
                                <div className="max-w-3xl mx-auto space-y-4">
                                    {blocks.map((block, index) => (
                                        <div key={block.id} className="bg-white p-6 rounded-lg shadow-sm border border-stone-200 relative group">
                                            <div className="absolute right-2 top-2 hidden group-hover:flex gap-2">
                                                <button onClick={() => removeBlock(block.id)} className="text-red-500 text-xs">Delete</button>
                                            </div>
                                            <div dangerouslySetInnerHTML={{ __html: generateBlockHTML(block) }} />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="bg-stone-900 text-amber-100 p-6 rounded-lg h-full overflow-auto font-mono text-sm">
                                    <button onClick={copyToClipboard} className="bg-amber-600 text-white px-4 py-2 rounded mb-4">
                                        {copied ? 'Copied!' : 'Copy Code'}
                                    </button>
                                    <pre>{fullOutput}</pre>
                                </div>
                            )}
                        </section>
                    </main>
                </div>
            );
        };

        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<App />);
    </script>
</body>
</html>
