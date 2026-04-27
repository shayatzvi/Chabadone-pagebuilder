import React, { useState, useEffect } from 'react';
import {
  Copy, Check, Palette, Type, Image as ImageIcon, Code,
  Eye, Layout, Plus, Trash2, MoveUp, MoveDown, Settings,
  ExternalLink, Sparkles, BookOpen, Layers, Columns, AlignCenter
} from 'lucide-react';

const App = () => {
  const [blocks, setBlocks] = useState([
    { id: '1', type: 'header', title: 'Community Event', subtitle: 'Join us for an inspiring experience' },
    { id: '2', type: 'image-text', imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80', text: 'Welcome to our community page. This designer allows you to build beautiful, responsive layouts for your ChabadOne site. Use the blocks on the left to add content, and customize colors to match your brand.', layout: 'left' },
    { id: '3', type: 'button', label: 'Register Now', link: '#', style: 'pill' }
  ]);
 
  const [primaryColor, setPrimaryColor] = useState('#2c3e50');
  const [accentColor, setAccentColor] = useState('#e67e22');
  const [bgColor, setBgColor] = useState('#f4f4f4');
  const [bootstrapTheme, setBootstrapTheme] = useState('3.3.7');
  const [activeTab, setActiveTab] = useState('edit');
  const [editingBlockId, setEditingBlockId] = useState(null);
  const [copied, setCopied] = useState(false);

  // --- Templates ---
  const applyTemplate = (template) => {
    if (template === 'modern') {
      setPrimaryColor('#1a1a1a');
      setAccentColor('#3498db');
      setBgColor('#ffffff');
      setBlocks([
        { id: 'm1', type: 'header', title: 'Upcoming Gala', subtitle: 'A Night of Celebration' },
        { id: 'm2', type: 'image-text', imageUrl: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=800&q=80', text: 'We invite you to join us for our annual gala. An evening dedicated to growth, community, and the future of our center.', layout: 'right' },
        { id: 'm3', type: 'button', label: 'Purchase Tickets', link: '#', style: 'square' }
      ]);
    } else if (template === 'warm') {
      setPrimaryColor('#7b241c');
      setAccentColor('#d35400');
      setBgColor('#fef5e7');
      setBlocks([
        { id: 'w1', type: 'header', title: 'Friday Night Live', subtitle: 'Warmth, Song, and Spirit' },
        { id: 'w2', type: 'quote', text: 'The soul is a candle of God.' },
        { id: 'w3', type: 'image-text', imageUrl: 'https://images.unsplash.com/photo-1544427920-c49ccfb85579?auto=format&fit=crop&w=800&q=80', text: 'Experience the magic of Shabbat with our community. Gourmet food, meaningful discussion, and great company.', layout: 'left' },
        { id: 'w4', type: 'button', label: 'Reserve a Seat', link: '#', style: 'pill' }
      ]);
    }
  };

  // --- Block Management ---
  const addBlock = (type) => {
    const newBlock = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      ...(type === 'header' && { title: 'New Section', subtitle: 'Description goes here' }),
      ...(type === 'image-text' && { imageUrl: 'https://via.placeholder.com/800x400', text: 'Edit this text to describe your content.', layout: 'left' }),
      ...(type === 'button' && { label: 'Click Here', link: '#', style: 'pill' }),
      ...(type === 'quote' && { text: 'Add an inspiring quote.' }),
      ...(type === 'grid' && { items: [{title: 'Step 1', desc: 'Detail one'}, {title: 'Step 2', desc: 'Detail two'}, {title: 'Step 3', desc: 'Detail three'}] })
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

  // --- Theme Links ---
  const bootstrapLinks = {
    '3.3.7': 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css',
    'paper': 'https://cdnjs.cloudflare.com/ajax/libs/bootswatch/3.3.7/paper/bootstrap.min.css',
    'journal': 'https://cdnjs.cloudflare.com/ajax/libs/bootswatch/3.3.7/journal/bootstrap.min.css',
    'lumen': 'https://cdnjs.cloudflare.com/ajax/libs/bootswatch/3.3.7/lumen/bootstrap.min.css',
    'flatly': 'https://cdnjs.cloudflare.com/ajax/libs/bootswatch/3.3.7/flatly/bootstrap.min.css'
  };

  // --- HTML Generators ---
  const generateBlockHTML = (block) => {
    switch (block.type) {
      case 'header':
        return `<div class="hero-section" style="background: linear-gradient(135deg, ${bgColor} 0%, #ffffff 100%); text-align: center; padding: 80px 20px; border-radius: 20px; margin-bottom: 30px; border: 1px solid rgba(0,0,0,0.05);">
        <h1 style="font-family: 'Playfair Display', serif; font-size: 3.5rem; color: ${primaryColor}; margin: 0; font-weight: 700; line-height: 1.2;">${block.title}</h1>
        <div style="font-style: italic; color: ${accentColor}; font-size: 1.3rem; font-family: 'Playfair Display', serif; margin-top: 15px;">${block.subtitle}</div>
    </div>`;
     
      case 'image-text':
        const isRight = block.layout === 'right';
        return `<div class="container-fluid" style="margin-bottom: 40px;">
        <div class="row display-flex" style="flex-direction: ${isRight ? 'row-reverse' : 'row'};">
            <div class="col-md-5">
                <div class="img-container"><img src="${block.imageUrl}" class="img-responsive" style="border-radius: 12px; border: 8px solid #fff; box-shadow: 0 15px 35px rgba(0,0,0,0.1); width: 100%;"></div>
            </div>
            <div class="col-md-7">
                <div class="description-text" style="font-family: 'Montserrat', sans-serif; font-size: 1.15rem; line-height: 1.8; color: #333; padding: 20px;">${block.text}</div>
            </div>
        </div>
    </div>`;
     
      case 'button':
        const borderRadius = block.style === 'pill' ? '50px' : '4px';
        return `<div style="text-align: center; margin: 40px 0;">
        <a href="${block.link}" class="btn-fancy" style="border-radius: ${borderRadius};">${block.label}</a>
    </div>`;
     
      case 'quote':
        return `<div style="padding: 40px; border-left: 6px solid ${accentColor}; background: ${bgColor}; margin: 40px 0; font-family: 'Playfair Display', serif; font-style: italic; font-size: 1.8rem; color: ${primaryColor}; border-radius: 0 15px 15px 0; text-align: center;">
        "${block.text}"
    </div>`;

      case 'grid':
        return `<div class="container-fluid" style="margin-bottom: 40px;">
          <div class="row">
            ${block.items.map(item => `
              <div class="col-md-4 text-center" style="padding: 20px;">
                <div style="font-family: 'Playfair Display', serif; font-size: 1.5rem; color: ${primaryColor}; margin-bottom: 10px; font-weight: bold;">${item.title}</div>
                <div style="font-family: 'Montserrat', sans-serif; font-size: 1rem; color: #666;">${item.desc}</div>
              </div>
            `).join('')}
          </div>
        </div>`;
      default: return '';
    }
  };

  const fullOutput = `<style>
    @import url('${bootstrapLinks[bootstrapTheme]}');
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=Montserrat:wght@300;600&display=swap');

    .fancy-wrapper { font-family: 'Montserrat', sans-serif; background: #ffffff; padding: 20px; color: #333; }
    .display-flex { display: flex; flex-wrap: wrap; align-items: center; }
    .btn-fancy {
        background: ${primaryColor};
        color: #fff !important;
        padding: 16px 45px;
        text-transform: uppercase;
        letter-spacing: 2px;
        font-size: 0.85rem;
        font-weight: 600;
        border: none;
        display: inline-block;
        text-decoration: none !important;
        transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    }
    .btn-fancy:hover { background: ${accentColor}; transform: translateY(-2px); box-shadow: 0 8px 25px rgba(0,0,0,0.15); }
    @media (max-width: 768px) { .display-flex { display: block !important; } .hero-section h1 { font-size: 2.2rem !important; } }
</style>

<div class="fancy-wrapper">
    ${blocks.map(b => generateBlockHTML(b)).join('\n')}
</div>`;

  const copyToClipboard = () => {
    const el = document.createElement('textarea');
    el.value = fullOutput;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col font-sans text-stone-800">
      <header className="bg-stone-900 text-white p-4 shadow-xl flex justify-between items-center z-50">
        <div className="flex items-center gap-3">
          <div className="bg-amber-600 p-1.5 rounded-lg"><Sparkles size={20}/></div>
          <h1 className="text-xl font-bold m-0 tracking-tighter">ChabadOne Builder <span className="text-amber-500">Elite</span></h1>
        </div>
        <div className="flex bg-stone-800 rounded-lg p-1 gap-1">
          <button onClick={() => setActiveTab('edit')} className={`px-5 py-1.5 rounded-md text-xs font-bold transition-all ${activeTab === 'edit' ? 'bg-amber-600 text-white shadow-lg' : 'text-stone-400 hover:text-white'}`}>DESIGN</button>
          <button onClick={() => setActiveTab('code')} className={`px-5 py-1.5 rounded-md text-xs font-bold transition-all ${activeTab === 'code' ? 'bg-amber-600 text-white shadow-lg' : 'text-stone-400 hover:text-white'}`}>EXPORT</button>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-85 bg-white border-r border-stone-200 overflow-y-auto p-6 shadow-2xl z-40">
         
          <section className="mb-8">
            <h2 className="text-[10px] font-black uppercase text-stone-400 mb-4 tracking-[0.2em] flex items-center gap-2">
              <Layers size={14} /> Style Templates
            </h2>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => applyTemplate('modern')} className="p-2 border rounded-lg hover:border-amber-500 hover:bg-amber-50 transition text-[11px] font-bold uppercase">Modern Blue</button>
              <button onClick={() => applyTemplate('warm')} className="p-2 border rounded-lg hover:border-orange-500 hover:bg-orange-50 transition text-[11px] font-bold uppercase">Warm Earth</button>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-[10px] font-black uppercase text-stone-400 mb-4 tracking-[0.2em] flex items-center gap-2">
              <BookOpen size={14} /> Bootstrap Theme (CDN)
            </h2>
            <select
              value={bootstrapTheme}
              onChange={(e) => setBootstrapTheme(e.target.value)}
              className="w-full p-2 border border-stone-200 rounded-lg text-sm bg-stone-50 outline-none"
            >
              <option value="3.3.7">Default (v3.3.7)</option>
              <option value="paper">Paper (Bootswatch)</option>
              <option value="journal">Journal (Bootswatch)</option>
              <option value="lumen">Lumen (Bootswatch)</option>
              <option value="flatly">Flatly (Bootswatch)</option>
            </select>
            <p className="text-[10px] text-stone-400 mt-2">Changes base typography and grid spacing.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-[10px] font-black uppercase text-stone-400 mb-4 tracking-[0.2em] flex items-center gap-2">
              <Plus size={14} /> Add Block
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {[
                { type: 'header', label: 'Banner', icon: <Layout size={12}/> },
                { type: 'image-text', label: 'Img+Txt', icon: <ImageIcon size={12}/> },
                { type: 'grid', label: 'Info Grid', icon: <Columns size={12}/> },
                { type: 'button', label: 'Button', icon: <ExternalLink size={12}/> },
                { type: 'quote', label: 'Quote', icon: <Type size={12}/> }
              ].map(item => (
                <button key={item.type} onClick={() => addBlock(item.type)} className="flex items-center justify-center gap-2 p-2 border border-stone-200 rounded hover:border-amber-500 transition text-[10px] font-bold uppercase">
                  {item.icon} {item.label}
                </button>
              ))}
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-[10px] font-black uppercase text-stone-400 mb-4 tracking-[0.2em] flex items-center gap-2">
              <Palette size={14} /> Brand Colors
            </h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-bold">PRIMARY</label>
                <input type="color" value={primaryColor} onChange={e => setPrimaryColor(e.target.value)} className="w-10 h-6 cursor-pointer rounded overflow-hidden p-0 border-none" />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-bold">ACCENT</label>
                <input type="color" value={accentColor} onChange={e => setAccentColor(e.target.value)} className="w-10 h-6 cursor-pointer rounded overflow-hidden p-0 border-none" />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-bold">SURFACE</label>
                <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} className="w-10 h-6 cursor-pointer rounded overflow-hidden p-0 border-none" />
              </div>
            </div>
          </section>

          {editingBlockId && (
            <section className="p-4 bg-amber-50/50 rounded-xl border border-amber-200 animate-in fade-in slide-in-from-top-2">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-[10px] font-black uppercase text-amber-800">Block Settings</h3>
                <button onClick={() => setEditingBlockId(null)} className="text-amber-800"><Check size={14}/></button>
              </div>
              {blocks.filter(b => b.id === editingBlockId).map(block => (
                <div key={block.id} className="space-y-3">
                  {block.type === 'header' && (
                    <>
                      <input value={block.title} onChange={e => updateBlock(block.id, 'title', e.target.value)} className="w-full p-2 border rounded text-xs" placeholder="Main Title"/>
                      <input value={block.subtitle} onChange={e => updateBlock(block.id, 'subtitle', e.target.value)} className="w-full p-2 border rounded text-xs" placeholder="Sub Headline"/>
                    </>
                  )}
                  {block.type === 'image-text' && (
                    <>
                      <select value={block.layout} onChange={e => updateBlock(block.id, 'layout', e.target.value)} className="w-full p-2 border rounded text-xs">
                        <option value="left">Image Left</option>
                        <option value="right">Image Right</option>
                      </select>
                      <input value={block.imageUrl} onChange={e => updateBlock(block.id, 'imageUrl', e.target.value)} className="w-full p-2 border rounded text-xs" placeholder="Image URL"/>
                      <textarea value={block.text} onChange={e => updateBlock(block.id, 'text', e.target.value)} className="w-full p-2 border rounded text-xs" rows={4} placeholder="Content Text"/>
                    </>
                  )}
                  {block.type === 'button' && (
                    <>
                      <input value={block.label} onChange={e => updateBlock(block.id, 'label', e.target.value)} className="w-full p-2 border rounded text-xs" placeholder="Button Text"/>
                      <input value={block.link} onChange={e => updateBlock(block.id, 'link', e.target.value)} className="w-full p-2 border rounded text-xs" placeholder="Link URL"/>
                      <select value={block.style} onChange={e => updateBlock(block.id, 'style', e.target.value)} className="w-full p-2 border rounded text-xs">
                        <option value="pill">Pill Shape</option>
                        <option value="square">Square Shape</option>
                      </select>
                    </>
                  )}
                  {block.type === 'quote' && (
                    <textarea value={block.text} onChange={e => updateBlock(block.id, 'text', e.target.value)} className="w-full p-2 border rounded text-xs" rows={3} placeholder="Quote..."/>
                  )}
                  {block.type === 'grid' && (
                    <p className="text-[10px] text-stone-500 italic">Grid items are 3-columns by default. Edit via code for more complexity.</p>
                  )}
                </div>
              ))}
            </section>
          )}
        </div>

        {/* Editor Area */}
        <div className="flex-1 bg-stone-100 p-8 overflow-y-auto" key={bootstrapTheme}>
          {activeTab === 'edit' ? (
            <div className="max-w-4xl mx-auto space-y-6">
              {blocks.map((block, index) => (
                <div key={block.id} className="group relative bg-white rounded-xl shadow-sm border border-stone-200 transition-all hover:border-amber-400">
                  <div className="absolute -left-10 top-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => moveBlock(index, -1)} className="p-1.5 bg-white border border-stone-200 rounded shadow-sm hover:bg-stone-50"><MoveUp size={12}/></button>
                    <button onClick={() => moveBlock(index, 1)} className="p-1.5 bg-white border border-stone-200 rounded shadow-sm hover:bg-stone-50"><MoveDown size={12}/></button>
                  </div>
                  <div className="absolute -right-10 top-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => setEditingBlockId(block.id)} className="p-1.5 bg-white border border-stone-200 rounded shadow-sm hover:text-amber-600"><Settings size={12}/></button>
                    <button onClick={() => removeBlock(block.id)} className="p-1.5 bg-white border border-stone-200 rounded shadow-sm hover:text-red-600"><Trash2 size={12}/></button>
                  </div>

                  <div className="p-6">
                    {block.type === 'header' && (
                      <div className="text-center p-12 rounded-xl border border-stone-100" style={{ background: `linear-gradient(135deg, ${bgColor} 0%, #ffffff 100%)` }}>
                        <h1 style={{ fontFamily: 'Playfair Display', color: primaryColor, fontSize: '2.5rem', margin: 0, fontWeight: 700 }}>{block.title}</h1>
                        <p style={{ color: accentColor, fontStyle: 'italic' }}>{block.subtitle}</p>
                      </div>
                    )}
                    {block.type === 'image-text' && (
                      <div className={`flex gap-8 items-center ${block.layout === 'right' ? 'flex-row-reverse' : ''}`}>
                        <img src={block.imageUrl} className="w-1/3 rounded-lg shadow-md border-4 border-white" alt="p" />
                        <div className="w-2/3 text-sm text-stone-600 leading-relaxed">{block.text}</div>
                      </div>
                    )}
                    {block.type === 'button' && (
                      <div className="text-center">
                        <button style={{ backgroundColor: primaryColor, color: 'white', padding: '12px 35px', borderRadius: block.style === 'pill' ? '50px' : '4px', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase' }}>{block.label}</button>
                      </div>
                    )}
                    {block.type === 'quote' && (
                      <div className="p-6 border-l-8 rounded-r-lg text-center" style={{ borderColor: accentColor, background: bgColor }}>
                        <p className="italic text-xl" style={{ fontFamily: 'Playfair Display', color: primaryColor }}>"{block.text}"</p>
                      </div>
                    )}
                    {block.type === 'grid' && (
                      <div className="flex justify-around gap-4 text-center py-4">
                        {block.items.map((item, i) => (
                          <div key={i} className="flex-1">
                            <h4 className="font-bold text-amber-700">{item.title}</h4>
                            <p className="text-xs text-stone-500">{item.desc}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-full bg-stone-900 rounded-2xl overflow-hidden flex flex-col shadow-2xl">
              <div className="p-4 border-b border-stone-800 flex justify-between items-center bg-stone-800">
                <span className="text-stone-500 text-[10px] font-black uppercase tracking-widest">READY FOR SOURCE TAB</span>
                <button onClick={copyToClipboard} className="bg-amber-600 hover:bg-amber-500 text-white px-8 py-2 rounded-lg font-bold text-sm transition-all shadow-lg active:scale-95">
                  {copied ? 'COPIED TO CLIPBOARD' : 'COPY FULL CODE'}
                </button>
              </div>
              <pre className="flex-1 p-8 text-amber-100 text-[11px] font-mono overflow-auto leading-relaxed">
                {fullOutput}
              </pre>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
