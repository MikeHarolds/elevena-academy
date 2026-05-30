import { useState, useEffect, useRef } from 'react';
import {
  Plus, Edit3, Trash2, Eye, X, AlertCircle,
  BookOpen, Search, Star, Clock, Users, GraduationCap,
  ChevronUp, ChevronDown, Download, Copy, Upload, Link, Image
} from 'lucide-react';
import {
  getCourses, addCourse, updateCourse, deleteCourse,
  saveCourses, seedDefaultCourses,
  COLOR_OPTIONS, PRESET_IMAGES, EMOJI_OPTIONS, getEmptyCourse,
} from '../utils/courses';
import type { CourseData } from '../utils/courses';

function formatDate(d: string) {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

function getTagBadge(course: CourseData) {
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${course.color} text-white`}>
      {course.tag}
    </span>
  );
}

// ==================== IMAGE UPLOADER ====================
type ImageMode = 'preset' | 'upload' | 'url';

function ImageUploader({ image, onImageChange }: { image: string | null; onImageChange: (v: string | null) => void }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [mode, setMode] = useState<ImageMode>(() => {
    if (!image) return 'preset';
    if (image.startsWith('data:')) return 'upload';
    if (image.startsWith('http')) return 'url';
    return 'preset';
  });
  const [urlInput, setUrlInput] = useState(() =>
    image && image.startsWith('http') ? image : ''
  );
  const [uploadError, setUploadError] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError('');
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setUploadError('Please select a valid image file (PNG, JPG, GIF, WebP)');
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setUploadError('Image must be under 2MB. Please compress it first.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result as string;
      onImageChange(result);
      setMode('upload');
    };
    reader.onerror = () => setUploadError('Failed to read file. Please try again.');
    reader.readAsDataURL(file);
  };

  const handleUrlChange = (url: string) => {
    setUrlInput(url);
    if (url.trim()) {
      onImageChange(url.trim());
    } else {
      onImageChange(null);
    }
  };

  const handlePresetChange = (value: string) => {
    onImageChange(value || null);
    setMode('preset');
  };

  const handleRemove = () => {
    onImageChange(null);
    setUrlInput('');
    setUploadError('');
    if (fileRef.current) fileRef.current.value = '';
  };

  const previewSrc = image;

  const tabs: { id: ImageMode; label: string; icon: React.ReactNode }[] = [
    { id: 'preset', label: 'Preset', icon: <Image className="w-4 h-4" /> },
    { id: 'upload', label: 'Upload', icon: <Upload className="w-4 h-4" /> },
    { id: 'url', label: 'Image URL', icon: <Link className="w-4 h-4" /> },
  ];

  return (
    <div className="space-y-3">
      <label className="block text-sm font-bold text-gray-700">Course Image</label>

      {/* Mode Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
        {tabs.map(tab => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setMode(tab.id)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-all ${
              mode === tab.id ? 'bg-white text-violet-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Preset Selector */}
      {mode === 'preset' && (
        <div>
          <select
            value={image && !image.startsWith('data:') && !image.startsWith('http') ? image : ''}
            onChange={e => handlePresetChange(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-800 focus:ring-2 focus:ring-violet-500 outline-none text-sm"
          >
            <option value="">— Select a preset image —</option>
            {PRESET_IMAGES.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          <p className="text-xs text-gray-400 mt-1.5">Choose from our library of cartoon-style course images.</p>
        </div>
      )}

      {/* File Upload */}
      {mode === 'upload' && (
        <div>
          <div
            onClick={() => fileRef.current?.click()}
            className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-violet-400 hover:bg-violet-50/30 transition-all"
          >
            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm font-semibold text-gray-700">Click to upload an image</p>
            <p className="text-xs text-gray-400 mt-1">PNG, JPG, GIF or WebP — Max 2MB</p>
            <input
              ref={fileRef}
              type="file"
              accept="image/png,image/jpeg,image/gif,image/webp"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
          {uploadError && (
            <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {uploadError}
            </p>
          )}
          {image && image.startsWith('data:') && (
            <div className="mt-2 flex items-center gap-2">
              <span className="text-xs text-green-600 font-semibold">✅ Image uploaded</span>
              <span className="text-xs text-gray-400">
                ({(image.length / 1024).toFixed(0)} KB)
              </span>
            </div>
          )}
        </div>
      )}

      {/* URL Input */}
      {mode === 'url' && (
        <div>
          <div className="relative">
            <Link className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="url"
              value={urlInput}
              onChange={e => handleUrlChange(e.target.value)}
              placeholder="https://example.com/my-image.png"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-violet-500 outline-none text-sm"
            />
          </div>
          <p className="text-xs text-gray-400 mt-1.5">Paste a direct link to any image on the web. Make sure you have permission to use it.</p>
          {urlInput && (
            <button
              type="button"
              onClick={() => { onImageChange(urlInput.trim()); }}
              className="mt-2 text-xs text-violet-600 font-bold hover:text-violet-700"
            >
              ✅ Apply URL
            </button>
          )}
        </div>
      )}

      {/* Preview */}
      {previewSrc && (
        <div className="mt-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Preview</span>
            <button
              type="button"
              onClick={handleRemove}
              className="text-xs text-red-500 hover:text-red-700 font-semibold flex items-center gap-1"
            >
              <X className="w-3 h-3" /> Remove image
            </button>
          </div>
          <div className="rounded-xl overflow-hidden border border-gray-200 bg-gray-50 h-40 relative group">
            <img
              src={previewSrc}
              alt="Course preview"
              className="w-full h-full object-cover"
              onError={e => {
                (e.target as HTMLImageElement).src = '';
                (e.target as HTMLImageElement).alt = 'Failed to load image';
              }}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
              <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-sm font-bold bg-black/40 px-3 py-1 rounded-full">
                {previewSrc.startsWith('data:') ? '📁 Uploaded file' : previewSrc.startsWith('http') ? '🔗 External URL' : '📂 Preset image'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* No image state */}
      {!previewSrc && (
        <div className="rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 h-24 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-400 text-sm">No image selected</p>
            <p className="text-gray-300 text-xs mt-0.5">The emoji icon will be used instead</p>
          </div>
        </div>
      )}
    </div>
  );
}

// ==================== COURSE FORM MODAL ====================
function CourseFormModal({ course, onClose, onSave }: {
  course: CourseData | null; onClose: () => void; onSave: () => void;
}) {
  const isEdit = !!course;
  const [form, setForm] = useState<Omit<CourseData, 'id' | 'createdAt' | 'updatedAt'>>(() => {
    if (course) {
      const { id: _id, createdAt: _c, updatedAt: _u, ...rest } = course;
      return rest;
    }
    return getEmptyCourse();
  });
  const [activeTab, setActiveTab] = useState<'basic' | 'details' | 'curriculum'>('basic');

  const set = (key: string, value: string | boolean | null) => setForm(p => ({ ...p, [key]: value }));
  const setColor = (v: string) => {
    const opt = COLOR_OPTIONS.find(c => c.value === v);
    setForm(p => ({ ...p, color: v, borderColor: opt?.border || 'border-violet-500/25' }));
  };
  const updateList = (key: 'highlights' | 'outcomes' | 'requirements', index: number, value: string) => {
    const arr = [...form[key]]; arr[index] = value;
    setForm(p => ({ ...p, [key]: arr }));
  };
  const addListItem = (key: 'highlights' | 'outcomes' | 'requirements') => setForm(p => ({ ...p, [key]: [...p[key], ''] }));
  const removeListItem = (key: 'highlights' | 'outcomes' | 'requirements', i: number) => setForm(p => ({ ...p, [key]: p[key].filter((_: string, idx: number) => idx !== i) }));
  const setCurDay = (di: number, k: string, v: string) => {
    const c = [...form.curriculum]; c[di] = { ...c[di], [k]: v }; setForm(p => ({ ...p, curriculum: c }));
  };
  const setTopic = (di: number, ti: number, v: string) => {
    const c = [...form.curriculum]; const t = [...c[di].topics]; t[ti] = v; c[di] = { ...c[di], topics: t }; setForm(p => ({ ...p, curriculum: c }));
  };
  const addDay = () => setForm(p => ({ ...p, curriculum: [...p.curriculum, { day: `Day ${p.curriculum.length + 1}`, title: '', topics: ['', '', '', ''] }] }));
  const removeDay = (i: number) => setForm(p => ({ ...p, curriculum: p.curriculum.filter((_, j) => j !== i) }));
  const addTopic = (di: number) => {
    const c = [...form.curriculum]; c[di] = { ...c[di], topics: [...c[di].topics, ''] }; setForm(p => ({ ...p, curriculum: c }));
  };
  const removeTopic = (di: number, ti: number) => {
    const c = [...form.curriculum]; c[di] = { ...c[di], topics: c[di].topics.filter((_, j) => j !== ti) }; setForm(p => ({ ...p, curriculum: c }));
  };

  const handleSave = () => {
    if (!form.title || !form.desc || !form.age || !form.price) return;
    if (isEdit && course) updateCourse(course.id, form); else addCourse(form);
    onSave(); onClose();
  };

  const ic = "w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all text-sm";
  const tc = "w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all text-sm resize-none";

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center p-4 pt-4 md:pt-6 overflow-y-auto">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full border border-gray-200 mb-8">
        <div className="sticky top-0 bg-white rounded-t-2xl border-b border-gray-100 p-5 z-10">
          <div className="flex items-center justify-between">
            <div><h2 className="text-xl font-bold text-gray-900">{isEdit ? 'Edit Course' : 'Add New Course'}</h2><p className="text-sm text-gray-400">Fill in the course details below</p></div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl"><X className="w-5 h-5 text-gray-400" /></button>
          </div>
          <div className="flex gap-1 mt-3 bg-gray-100 rounded-xl p-1">
            {([{ id: 'basic' as const, label: 'Basic Info', icon: <BookOpen className="w-4 h-4" /> },
              { id: 'details' as const, label: 'Details & Media', icon: <Star className="w-4 h-4" /> },
              { id: 'curriculum' as const, label: 'Curriculum', icon: <GraduationCap className="w-4 h-4" /> },
            ]).map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === tab.id ? 'bg-white text-violet-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>{tab.icon} {tab.label}</button>
            ))}
          </div>
        </div>

        <div className="p-6 space-y-5">
          {activeTab === 'basic' && (
            <div className="grid md:grid-cols-2 gap-5">
              <div className="md:col-span-2"><label className="block text-sm font-bold text-gray-700 mb-1.5">Course Title *</label><input type="text" value={form.title} onChange={e => set('title', e.target.value)} placeholder="e.g. Web Development for Kids" className={ic} /></div>
              <div className="md:col-span-2"><label className="block text-sm font-bold text-gray-700 mb-1.5">Short Description *</label><textarea rows={2} value={form.desc} onChange={e => set('desc', e.target.value)} placeholder="Brief description shown on course cards" className={tc} /></div>
              <div className="md:col-span-2"><label className="block text-sm font-bold text-gray-700 mb-1.5">Full Description</label><textarea rows={4} value={form.fullDesc} onChange={e => set('fullDesc', e.target.value)} placeholder="Detailed course description shown in the modal" className={tc} /></div>
              <div><label className="block text-sm font-bold text-gray-700 mb-1.5">Age Range *</label><input type="text" value={form.age} onChange={e => set('age', e.target.value)} placeholder="e.g. Ages 7–16" className={ic} /></div>
              <div><label className="block text-sm font-bold text-gray-700 mb-1.5">Duration *</label><input type="text" value={form.duration} onChange={e => set('duration', e.target.value)} placeholder="e.g. 3 Days" className={ic} /></div>
              <div><label className="block text-sm font-bold text-gray-700 mb-1.5">Sessions</label><input type="text" value={form.sessions} onChange={e => set('sessions', e.target.value)} placeholder="e.g. 6 sessions (2hrs each)" className={ic} /></div>
              <div><label className="block text-sm font-bold text-gray-700 mb-1.5">Price *</label><input type="text" value={form.price} onChange={e => set('price', e.target.value)} placeholder="e.g. £75" className={ic} /></div>
              <div><label className="block text-sm font-bold text-gray-700 mb-1.5">Tag / Badge</label><input type="text" value={form.tag} onChange={e => set('tag', e.target.value)} placeholder="e.g. 💻 Most Popular" className={ic} /></div>
              <div><label className="block text-sm font-bold text-gray-700 mb-1.5">Colour Theme</label><div className="grid grid-cols-5 gap-2">{COLOR_OPTIONS.map(o => (<button key={o.value} type="button" onClick={() => setColor(o.value)} className={`h-9 rounded-lg ${o.preview} transition-all ${form.color === o.value ? 'ring-2 ring-violet-500 ring-offset-2 scale-110' : 'opacity-60 hover:opacity-100'}`} title={o.label} />))}</div></div>
              <div><label className="flex items-center gap-2 text-sm font-bold text-gray-700"><input type="checkbox" checked={form.active} onChange={e => set('active', e.target.checked)} className="w-4 h-4 rounded border-gray-300 text-violet-600 focus:ring-violet-500" />Active (visible on website)</label></div>
            </div>
          )}
          {activeTab === 'details' && (
            <div className="space-y-5">
              <ImageUploader image={form.image} onImageChange={v => set('image', v)} />
              <div><label className="block text-sm font-bold text-gray-700 mb-1.5">Emoji Icon (if no image)</label><div className="grid grid-cols-10 gap-1">{EMOJI_OPTIONS.map(e => (<button key={e} type="button" onClick={() => set('icon', e)} className={`h-9 rounded-lg text-lg flex items-center justify-center transition-all ${form.icon === e ? 'bg-violet-100 ring-2 ring-violet-500' : 'bg-gray-50 hover:bg-gray-100'}`}>{e}</button>))}</div><div className="mt-2 flex items-center gap-2"><span className="text-sm text-gray-500">Preview:</span><span className="text-3xl">{form.icon}</span></div></div>
              {(['highlights', 'outcomes', 'requirements'] as const).map(key => (
                <div key={key}>
                  <div className="flex items-center justify-between mb-2"><label className="text-sm font-bold text-gray-700 capitalize">{key}</label><button type="button" onClick={() => addListItem(key)} className="text-xs text-violet-600 font-bold hover:text-violet-700">+ Add</button></div>
                  <div className="space-y-2">{form[key].map((item: string, i: number) => (<div key={i} className="flex items-center gap-2"><Star className="w-4 h-4 text-amber-400 shrink-0" /><input type="text" value={item} onChange={e => updateList(key, i, e.target.value)} placeholder={`${key.slice(0, -1)}...`} className={ic} />{form[key].length > 1 && (<button type="button" onClick={() => removeListItem(key, i)} className="p-1.5 hover:bg-red-50 rounded-lg text-gray-300 hover:text-red-500"><X className="w-4 h-4" /></button>)}</div>))}</div>
                </div>
              ))}
            </div>
          )}
          {activeTab === 'curriculum' && (
            <div className="space-y-4">
              {form.curriculum.map((day, di) => (
                <div key={di} className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
                  <div className={`bg-gradient-to-r ${form.color} px-4 py-3 flex items-center justify-between`}>
                    <div className="flex items-center gap-3"><div className="w-7 h-7 bg-white/20 rounded-lg flex items-center justify-center text-white font-bold text-sm">{di + 1}</div><input type="text" value={day.title} onChange={e => setCurDay(di, 'title', e.target.value)} placeholder={`${day.day} Title`} className="bg-white/10 border-0 text-white placeholder-white/50 font-bold text-sm px-3 py-1 rounded-lg outline-none focus:bg-white/20 w-64" /></div>
                    {form.curriculum.length > 1 && (<button type="button" onClick={() => removeDay(di)} className="text-white/60 hover:text-white"><X className="w-5 h-5" /></button>)}
                  </div>
                  <div className="p-4 space-y-2">
                    {day.topics.map((topic, ti) => (<div key={ti} className="flex items-center gap-2"><div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${form.color} shrink-0`} /><input type="text" value={topic} onChange={e => setTopic(di, ti, e.target.value)} placeholder={`Topic ${ti + 1}`} className="flex-1 px-3 py-1.5 rounded-lg border border-gray-200 text-sm bg-white text-gray-800 focus:ring-2 focus:ring-violet-500 outline-none" />{day.topics.length > 1 && (<button type="button" onClick={() => removeTopic(di, ti)} className="p-1 hover:bg-red-50 rounded text-gray-300 hover:text-red-500"><X className="w-3.5 h-3.5" /></button>)}</div>))}
                    <button type="button" onClick={() => addTopic(di)} className="text-xs text-violet-600 font-bold hover:text-violet-700 mt-1">+ Add Topic</button>
                  </div>
                </div>
              ))}
              <button type="button" onClick={addDay} className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 font-semibold text-sm hover:border-violet-400 hover:text-violet-600 transition-all flex items-center justify-center gap-2"><Plus className="w-4 h-4" /> Add Curriculum Day</button>
            </div>
          )}
        </div>

        <div className="sticky bottom-0 bg-white border-t border-gray-100 p-5 rounded-b-2xl flex items-center justify-between">
          <p className="text-xs text-gray-400">{isEdit ? 'Editing existing course' : 'Creating new course'}</p>
          <div className="flex gap-3">
            <button onClick={onClose} className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50">Cancel</button>
            <button onClick={handleSave} disabled={!form.title || !form.desc || !form.age || !form.price} className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-blue-500 text-white font-bold text-sm hover:shadow-lg hover:shadow-violet-300 disabled:opacity-50 disabled:cursor-not-allowed">{isEdit ? 'Save Changes' : 'Create Course'}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== DELETE CONFIRM ====================
function DeleteConfirm({ name, onConfirm, onCancel }: { name: string; onConfirm: () => void; onCancel: () => void }) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"><AlertCircle className="w-8 h-8 text-red-500" /></div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Delete Course?</h3>
          <p className="text-gray-500 text-sm mb-6">Are you sure you want to delete <strong>{name}</strong>? This cannot be undone.</p>
          <div className="flex gap-3">
            <button onClick={onCancel} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-semibold hover:bg-gray-50">Cancel</button>
            <button onClick={onConfirm} className="flex-1 py-2.5 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600">Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== PREVIEW MODAL ====================
function PreviewModal({ course, onClose }: { course: CourseData; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center p-4 pt-8 overflow-y-auto">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-3xl w-full mb-8 overflow-hidden">
        <button onClick={onClose} className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/50"><X className="w-5 h-5" /></button>
        <div className="relative h-48 overflow-hidden">
          {course.image ? (<img src={course.image} alt={course.title} className="w-full h-full object-cover" />) : (<div className={`w-full h-full bg-gradient-to-br ${course.color} flex items-center justify-center`}><span className="text-8xl opacity-60">{course.icon}</span></div>)}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-6"><span className="bg-black/40 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1 rounded-full mr-2">{course.tag}</span><h2 className="text-2xl font-bold text-white mt-2">{course.title}</h2></div>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-4 gap-2">{[{ i: <Users className="w-3.5 h-3.5" />, l: course.age }, { i: <Clock className="w-3.5 h-3.5" />, l: course.duration }, { i: <GraduationCap className="w-3.5 h-3.5" />, l: course.sessions }, { i: <Star className="w-3.5 h-3.5" />, l: course.price }].map((s, i) => (<div key={i} className="bg-gray-50 rounded-lg p-2 text-center"><div className="flex items-center justify-center gap-1 text-violet-500">{s.i}</div><p className="text-xs font-semibold text-gray-700 mt-0.5">{s.l || '—'}</p></div>))}</div>
          <p className="text-gray-600 text-sm leading-relaxed">{course.fullDesc || course.desc}</p>
          {course.highlights.filter(h => h).length > 0 && (<div><h4 className="font-bold text-gray-800 text-sm mb-2">Highlights</h4><div className="flex flex-wrap gap-1">{course.highlights.filter(h => h).map((h, i) => (<span key={i} className="bg-violet-50 text-violet-600 text-xs font-semibold px-2.5 py-1 rounded-full">{h}</span>))}</div></div>)}
          {course.curriculum.length > 0 && (<div><h4 className="font-bold text-gray-800 text-sm mb-2">Curriculum</h4>{course.curriculum.map((day, i) => (<div key={i} className="mb-2"><p className="text-xs font-bold text-violet-600">{day.day}: {day.title || 'Untitled'}</p><div className="flex flex-wrap gap-1 mt-1">{day.topics.filter(t => t).map((t, j) => (<span key={j} className="bg-gray-100 text-gray-600 text-[10px] font-semibold px-2 py-0.5 rounded-full">{t}</span>))}</div></div>))}</div>)}
        </div>
      </div>
    </div>
  );
}

// ==================== MAIN COURSE MANAGER (DATA GRID) ====================
export default function CourseManager() {
  const [courses, setCourses] = useState<CourseData[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editCourse, setEditCourse] = useState<CourseData | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<CourseData | null>(null);
  const [previewCourse, setPreviewCourse] = useState<CourseData | null>(null);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'draft'>('all');

  const reload = () => {
    seedDefaultCourses();
    setCourses(getCourses());
  };
  useEffect(() => { reload(); }, []);

  const filtered = courses.filter(c => {
    const matchSearch = !search || c.title.toLowerCase().includes(search.toLowerCase()) || c.tag.toLowerCase().includes(search.toLowerCase()) || c.age.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'all' || (filterStatus === 'active' ? c.active : !c.active);
    return matchSearch && matchStatus;
  });

  const handleToggleActive = (course: CourseData) => { updateCourse(course.id, { active: !course.active }); reload(); };
  const handleMove = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= courses.length) return;
    const updated = [...courses];
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    saveCourses(updated);
    reload();
  };
  const handleDuplicate = (course: CourseData) => {
    const { id: _id, createdAt: _c, updatedAt: _u, ...data } = course;
    addCourse({ ...data, title: course.title + ' (Copy)', active: false });
    reload();
  };
  const exportCSV = () => {
    const headers = ['ID', 'Title', 'Age', 'Duration', 'Price', 'Status', 'Tag', 'Days', 'Created'];
    const rows = filtered.map(c => [c.id, c.title, c.age, c.duration, c.price, c.active ? 'Active' : 'Draft', c.tag, c.curriculum.length, formatDate(c.createdAt)]);
    const csv = [headers, ...rows].map(r => r.map(v => `"${v}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = `courses-${new Date().toISOString().split('T')[0]}.csv`; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2"><BookOpen className="w-5 h-5 text-violet-500" /> Course Management</h3>
            <p className="text-sm text-gray-400">{courses.length} total · {courses.filter(c => c.active).length} active · {courses.filter(c => !c.active).length} draft</p>
          </div>
          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            <div className="relative flex-1 lg:flex-none min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" placeholder="Search courses..." value={search} onChange={e => setSearch(e.target.value)} className="w-full lg:w-56 pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-violet-500 outline-none" />
            </div>
            <select value={filterStatus} onChange={e => setFilterStatus(e.target.value as 'all' | 'active' | 'draft')} className="px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-violet-500 outline-none bg-white">
              <option value="all">All Status</option><option value="active">Active</option><option value="draft">Draft</option>
            </select>
            <button onClick={exportCSV} className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-500 text-sm font-semibold hover:bg-gray-50"><Download className="w-4 h-4" /> Export</button>
            <button onClick={() => { setEditCourse(null); setShowForm(true); }} className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-blue-500 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:shadow-lg hover:shadow-violet-300 transition-all whitespace-nowrap"><Plus className="w-4 h-4" /> Add Course</button>
          </div>
        </div>
      </div>

      {/* Results count */}
      <p className="text-xs text-gray-400 px-1">Showing <span className="font-bold text-gray-600">{filtered.length}</span> of {courses.length} courses</p>

      {/* Data Grid */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {filtered.length === 0 ? (
          <div className="text-center py-16 px-6">
            <BookOpen className="w-16 h-16 text-gray-200 mx-auto mb-4" />
            <p className="text-gray-400 font-semibold text-lg">{search || filterStatus !== 'all' ? 'No courses match your filters' : 'No courses yet'}</p>
            <p className="text-gray-300 text-sm mt-1">{search || filterStatus !== 'all' ? 'Try adjusting your search or filters' : 'Click "Add Course" to create your first course'}</p>
            {!search && filterStatus === 'all' && (<button onClick={() => { setEditCourse(null); setShowForm(true); }} className="mt-4 inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-blue-500 text-white px-5 py-2.5 rounded-xl font-bold text-sm"><Plus className="w-4 h-4" /> Create First Course</button>)}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-100">
                  <th className="text-left py-3 px-3 text-xs font-bold text-gray-400 uppercase w-12">#</th>
                  <th className="text-left py-3 px-3 text-xs font-bold text-gray-400 uppercase">Course</th>
                  <th className="text-left py-3 px-3 text-xs font-bold text-gray-400 uppercase">Tag</th>
                  <th className="text-left py-3 px-3 text-xs font-bold text-gray-400 uppercase">Age</th>
                  <th className="text-left py-3 px-3 text-xs font-bold text-gray-400 uppercase">Duration</th>
                  <th className="text-left py-3 px-3 text-xs font-bold text-gray-400 uppercase">Price</th>
                  <th className="text-left py-3 px-3 text-xs font-bold text-gray-400 uppercase">Days</th>
                  <th className="text-left py-3 px-3 text-xs font-bold text-gray-400 uppercase">Status</th>
                  <th className="text-left py-3 px-3 text-xs font-bold text-gray-400 uppercase">Created</th>
                  <th className="text-right py-3 px-3 text-xs font-bold text-gray-400 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((course, index) => (
                  <tr key={course.id} className={`border-b border-gray-50 hover:bg-violet-50/30 transition-colors ${!course.active ? 'opacity-50' : ''}`}>
                    {/* Order + Reorder */}
                    <td className="py-3 px-3">
                      <div className="flex flex-col gap-0.5">
                        <button onClick={() => handleMove(courses.indexOf(course), 'up')} disabled={courses.indexOf(course) === 0} className="p-0.5 hover:bg-gray-200 rounded text-gray-300 hover:text-gray-600 disabled:opacity-20"><ChevronUp className="w-3.5 h-3.5" /></button>
                        <span className="text-xs text-gray-400 font-bold text-center">{index + 1}</span>
                        <button onClick={() => handleMove(courses.indexOf(course), 'down')} disabled={courses.indexOf(course) === courses.length - 1} className="p-0.5 hover:bg-gray-200 rounded text-gray-300 hover:text-gray-600 disabled:opacity-20"><ChevronDown className="w-3.5 h-3.5" /></button>
                      </div>
                    </td>
                    {/* Course Info */}
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl overflow-hidden shrink-0">
                          {course.image ? (<img src={course.image} alt={course.title} className="w-full h-full object-cover" />) : (<div className={`w-full h-full bg-gradient-to-br ${course.color} flex items-center justify-center`}><span className="text-lg">{course.icon}</span></div>)}
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-gray-800 text-sm truncate max-w-[200px]">{course.title}</p>
                          <p className="text-xs text-gray-400 truncate max-w-[200px]">{course.desc}</p>
                        </div>
                      </div>
                    </td>
                    {/* Tag */}
                    <td className="py-3 px-3">{getTagBadge(course)}</td>
                    {/* Age */}
                    <td className="py-3 px-3 text-sm text-gray-600">{course.age || '—'}</td>
                    {/* Duration */}
                    <td className="py-3 px-3 text-sm text-gray-600">{course.duration || '—'}</td>
                    {/* Price */}
                    <td className="py-3 px-3 text-sm font-bold text-gray-800">{course.price || '—'}</td>
                    {/* Curriculum Days */}
                    <td className="py-3 px-3 text-sm text-gray-600 text-center">{course.curriculum.length}</td>
                    {/* Status */}
                    <td className="py-3 px-3">
                      <button
                        onClick={() => handleToggleActive(course)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${
                          course.active
                            ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                            : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${course.active ? 'bg-emerald-500' : 'bg-gray-400'}`} />
                        {course.active ? 'Active' : 'Draft'}
                      </button>
                    </td>
                    {/* Created */}
                    <td className="py-3 px-3 text-xs text-gray-400 whitespace-nowrap">{formatDate(course.createdAt)}</td>
                    {/* Actions */}
                    <td className="py-3 px-3">
                      <div className="flex items-center justify-end gap-0.5">
                        <button onClick={() => setPreviewCourse(course)} className="p-2 hover:bg-blue-50 rounded-lg text-gray-400 hover:text-blue-600 transition-colors" title="Preview"><Eye className="w-4 h-4" /></button>
                        <button onClick={() => handleDuplicate(course)} className="p-2 hover:bg-violet-50 rounded-lg text-gray-400 hover:text-violet-600 transition-colors" title="Duplicate"><Copy className="w-4 h-4" /></button>
                        <button onClick={() => { setEditCourse(course); setShowForm(true); }} className="p-2 hover:bg-violet-50 rounded-lg text-gray-400 hover:text-violet-600 transition-colors" title="Edit"><Edit3 className="w-4 h-4" /></button>
                        <button onClick={() => setDeleteTarget(course)} className="p-2 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-600 transition-colors" title="Delete"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modals */}
      {showForm && (<CourseFormModal course={editCourse} onClose={() => { setShowForm(false); setEditCourse(null); }} onSave={reload} />)}
      {deleteTarget && (<DeleteConfirm name={deleteTarget.title} onConfirm={() => { deleteCourse(deleteTarget.id); setDeleteTarget(null); reload(); }} onCancel={() => setDeleteTarget(null)} />)}
      {previewCourse && (<PreviewModal course={previewCourse} onClose={() => setPreviewCourse(null)} />)}
    </div>
  );
}
