import React, { useState, useEffect, useCallback, CSSProperties, useRef } from 'react';
import ReactDOM from 'react-dom';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { StoreContext } from '../context/StoreContext';
import AdminLogin from './AdminLogin';

// --- API Configuration ---
const API_BASE_URL = 'http://localhost:5000'; // IMPORTANT: Change to your backend URL

// --- SVG Icons ---
const Logo = () => <img src="https://upload.wikimedia.org/wikipedia/commons/a/ae/Vignan_logo.png" alt="Vignan's Logo" style={{ height: '45px', width: 'auto' }} />;
const UserProfileIcon = () => <img src="https://i.imgur.com/6VBx3io.png" alt="User Profile" style={{ height: '40px', width: '40px', borderRadius: '50%', objectFit: 'cover', cursor: 'pointer' }} />;
const CrossIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>;
const EditIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>;
const MenuIcon = () => <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>;
const TrashIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>;
const UploadCloudIcon = () => <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="1.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>;
const MobileIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>;
const DesktopIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>;
const PlusSquareIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>;
const MinusSquareIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="8" y1="12" x2="16" y2="12"></line></svg>;


// --- Helper Components ---
const LoadingSpinner = () => <div style={styles.spinner}></div>;
const ErrorMessage = ({ message }: { message: string }) => <div style={styles.errorBanner}>{message}</div>;

// --- Custom Form Controls ---
const ImageUpload = ({ label, name, icon, initialImage, isRequired }: { label: string; name: string; icon?: React.ReactNode; initialImage?: string | null; isRequired?: boolean; }) => {
    const [preview, setPreview] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => { setPreview(initialImage || null); }, [initialImage]);

    return (
        <div style={styles.formGroup}>
            <label style={styles.label}>{label} {icon}</label>
            <div className="upload-box" style={styles.uploadBox} onClick={() => inputRef.current?.click()}>
                <input ref={inputRef} type="file" name={name} accept="image/*" onChange={(e) => { const file = e.target.files?.[0]; if(file) { setPreview(URL.createObjectURL(file));}}} style={{ display: 'none' }} required={!initialImage && isRequired}/>
                {preview ? (<>
                    <img src={preview} alt="Preview" style={styles.uploadPreview} />
                    <div className="upload-overlay" style={styles.uploadOverlay}><span>Change Image</span></div>
                </>) : (
                <div style={styles.uploadPlaceholder}><UploadCloudIcon /><span>Upload</span></div>)}
            </div>
        </div>
    );
};

const ColorPicker = ({ name, initialValue = '#3498db' }: { name: string; initialValue?: string }) => {
    const [color, setColor] = useState(initialValue);
    const colorInputRef = useRef<HTMLInputElement>(null);
    useEffect(() => { setColor(initialValue) }, [initialValue]);

    return (
        <div>
            <label style={styles.label}>Background Color</label>
            <div style={styles.colorPickerWrapper} onClick={() => colorInputRef.current?.click()}>
                <div style={{...styles.colorPickerSwatch, backgroundColor: color }}></div>
                <span style={styles.colorPickerValue}>{color}</span>
                <input ref={colorInputRef} type="color" name={name} value={color} onChange={(e) => setColor(e.target.value)} style={{ display: 'none' }} />
            </div>
        </div>
    );
}

// --- TYPE DEFINITIONS ---
interface FacultyMember { sno: number; name: string; designation: string; }
interface Department { _id: string; code: string; name: string; about: string; hodMessage: string; hodName: string; hodImage: string; heroImage: string; vision: string; mission: string[]; faculty: FacultyMember[]; }
interface NewsEvent { _id: string; type: string; title: string; date: string; description: string; pathlink: string; image: string; bgColor: string; }
interface HeroImage { _id: string; title: string; desktopImage: string; mobileImage: string; }
interface Announcement {_id: string; date: string; title: string; path: string; description: string;}
interface Placement {_id:string; student: string; company: string; package: string; image: string; companyLogo: string;}

// --- FORM COMPONENTS ---
const DepartmentForm = ({ onFormSubmit, initialData, onCancel }: { 
    onFormSubmit: (data: FormData) => void; 
    initialData?: Department | HeroImage; 
    onCancel: () => void 
}) => {
    const [missionPoints, setMissionPoints] = useState<string[]>([]);
    const [faculty, setFaculty] = useState<FacultyMember[]>([]);

    useEffect(() => { 
        setMissionPoints(initialData?.mission || ['']); 
        setFaculty(initialData?.faculty || [{ sno: 1, name: '', designation: '' }]); 
    }, [initialData]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => { 
        e.preventDefault(); 
        const formData = new FormData(e.currentTarget); 
        formData.append('mission', JSON.stringify(missionPoints.filter(m => m))); 
        formData.append('faculty', JSON.stringify(faculty.filter(f => f.name && f.designation))); 
        onFormSubmit(formData); 
    };

    const handleFacultyChange = (index: number, field: keyof FacultyMember, value: string | number) => { 
        setFaculty(faculty.map((f, i) => i === index ? { ...f, [field]: value } : f)); 
    };

    const addFaculty = () => setFaculty([...faculty, { sno: faculty.length + 1, name: '', designation: '' }]);
    const removeFaculty = (index: number) => setFaculty(faculty.filter((_, i) => i !== index));
    const addMissionPoint = () => setMissionPoints([...missionPoints, '']);
    const removeMissionPoint = (index: number) => setMissionPoints(missionPoints.filter((_, i) => i !== index));

    return (
        <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.formRow}>
                <div style={{...styles.formGroup, flex: 1, marginRight: '10px'}}>
                    <label style={styles.label}>Department Code (e.g., 'cse')</label>
                    <input name="code" defaultValue={initialData?.code} style={styles.input} required disabled={!!initialData} />
                </div>
                <div style={{...styles.formGroup, flex: 1, marginLeft: '10px'}}>
                    <label style={styles.label}>Department Name</label>
                    <input name="name" defaultValue={initialData?.name} style={styles.input} required />
                </div>
            </div>
            <div style={styles.formGroup}>
                <label style={styles.label}>About Department</label>
                <textarea name="about" defaultValue={initialData?.about} style={styles.textarea} required />
            </div>
            <div style={styles.formRow}>
                <div style={{...styles.formGroup, flex: 1, marginRight: '10px'}}>
                    <label style={styles.label}>HOD Name</label>
                    <input name="hodName" defaultValue={initialData?.hodName} style={styles.input} required />
                </div>
                <div style={{...styles.formGroup, flex: 1, marginLeft: '10px'}}>
                    <label style={styles.label}>Vision</label>
                    <textarea name="vision" defaultValue={initialData?.vision} style={{...styles.textarea, minHeight: '52px'}} required />
                </div>
            </div>
            <div style={styles.formGroup}>
                <label style={styles.label}>HOD Message</label>
                <textarea name="hodMessage" defaultValue={initialData?.hodMessage} style={styles.textarea} required />
            </div>
            <div style={styles.formRow}>
                <div style={{flex: 1, marginRight: '10px'}}>
                    <ImageUpload label="HOD Image" name="hodImage" initialImage={initialData?.hodImage ? `${API_BASE_URL}/uploads/${initialData.hodImage}`: undefined} isRequired={!initialData} />
                </div>
                <div style={{flex: 1, marginLeft: '10px'}}>
                    <ImageUpload label="Department Hero Image" name="heroImage" initialImage={initialData?.heroImage ? `${API_BASE_URL}/uploads/${initialData.heroImage}` : undefined} isRequired={!initialData} />
                </div>
            </div>
            <div style={styles.formGroup}>
                <label style={styles.label}>Mission Points</label>
                {missionPoints.map((point, index) => 
                    (<div key={index} style={{display: 'flex', alignItems: 'center', marginBottom: '8px'}}>
                        <input value={point} onChange={(e) => { const newPoints = [...missionPoints]; newPoints[index] = e.target.value; setMissionPoints(newPoints); }} style={{...styles.input, flex: 1}} placeholder={`Mission Point ${index + 1}`} />
                        <button type="button" onClick={() => removeMissionPoint(index)} style={styles.removeButton} title="Delete Point"><TrashIcon /></button>
                    </div>)
                )}
                <button type="button" onClick={addMissionPoint} style={styles.addButton}>Add Mission Point</button>
            </div>
            <div style={styles.formGroup}>
                <label style={styles.label}>Faculty Members</label>
                {faculty.map((member, index) =>
                    (<div key={index} style={{...styles.formRow, marginBottom: '10px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px'}}>
                        <input type="number" value={member.sno} onChange={(e) => handleFacultyChange(index, 'sno', parseInt(e.target.value))} style={{...styles.input, flex: 0.5, marginRight: '10px'}} placeholder="S.No" />
                        <input value={member.name} onChange={(e) => handleFacultyChange(index, 'name', e.target.value)} style={{...styles.input, flex: 2, marginRight: '10px'}} placeholder="Faculty Name" />
                        <input value={member.designation} onChange={(e) => handleFacultyChange(index, 'designation', e.target.value)} style={{...styles.input, flex: 2}} placeholder="Designation" />
                        <button type="button" onClick={() => removeFaculty(index)} style={styles.removeButton} title="Delete Member"><TrashIcon /></button>
                    </div>)
                )}
                <button type="button" onClick={addFaculty} style={styles.addButton}>Add Faculty Member</button>
            </div>
            <div style={styles.formActions}>
                <button type="submit" style={styles.submitButton}>{initialData ? 'Update Department' : 'Add Department'}</button>
                <button type="button" onClick={onCancel} style={styles.cancelButton}>Cancel</button>
            </div>
        </form>
    );
};

const NewsEventForm = ({ onFormSubmit, initialData, onCancel }: { onFormSubmit: (data: FormData) => void; initialData?: NewsEvent | null; onCancel: () => void }) => {
    return (
         <form onSubmit={(e) => { e.preventDefault(); onFormSubmit(new FormData(e.currentTarget)); }} style={styles.form}>
            <div style={styles.formRow}>
                <div style={{...styles.formGroup, flex: 1, marginRight: '10px'}}>
                    <label style={styles.label}>Title</label>
                    <input name="title" defaultValue={initialData?.title} style={styles.input} required />
                </div>
                <div style={{...styles.formGroup, flex: 1, marginLeft: '10px'}}>
                    <label style={styles.label}>Type</label>
                    {/* <select name="type" defaultValue={initialData?.type || "News"} style={styles.input}>
                        <option value="News">News</option>
                        <option value="Event">Event</option>
                    </select> */}
                    <input name="type" defaultValue={initialData?.type} style={styles.input} required />
                </div>
            </div>
            <div style={styles.formRow}><div style={{...styles.formGroup, flex: 1, marginRight: '10px'}}><label style={styles.label}>Date</label><input name="date" type="date" defaultValue={initialData?.date ? new Date(initialData.date).toISOString().split('T')[0] : ''} style={styles.input} required /></div><div style={{...styles.formGroup, flex: 1, marginLeft: '10px'}}><ColorPicker name="bgColor" initialValue={initialData?.bgColor} /></div></div>
            <ImageUpload label="Event/News Image" name="image" initialImage={initialData?.image ? `${API_BASE_URL}/uploads/${initialData.image}`: undefined} isRequired={!initialData} />
            <div style={styles.formGroup}><label style={styles.label}>Description</label><textarea name="description" defaultValue={initialData?.description} style={styles.textarea} required /></div>
        <div style={styles.formGroup}>
        <label style={styles.label}>Path (URL)</label>
        <input
          type="url"
          name="pathlink"
          style={styles.input}
          defaultValue={initialData?.pathlink}
          placeholder="e.g., https://example.com"
          required
        />
      </div>
            <div style={styles.formActions}><button type="submit" style={styles.submitButton}>{initialData ? 'Update Item' : 'Create Item'}</button><button type="button" onClick={onCancel} style={styles.cancelButton}>Cancel</button></div>
        </form>
    );
};


const PlacementForm = ({ onFormSubmit, initialData, onCancel }: { onFormSubmit: (data: FormData) => void; initialData?: Placement | null; onCancel: () => void }) => {
    return (
        <form onSubmit={(e) => { e.preventDefault(); onFormSubmit(new FormData(e.currentTarget)); }} style={styles.form}>
            <div style={styles.formRow}>
                <div style={{ ...styles.formGroup, flex: 1, marginRight: '10px' }}>
                    <label style={styles.label}>Student Name</label>
                    <input name="student" defaultValue={initialData?.student} style={styles.input} required />
                </div>
                <div style={{ ...styles.formGroup, flex: 1, marginLeft: '10px' }}>
                    <label style={styles.label}>Company</label>
                    <input name="company" defaultValue={initialData?.company} style={styles.input} required />
                </div>
            </div>

            <div style={styles.formRow}>
                <div style={{ ...styles.formGroup, flex: 1, marginRight: '10px' }}>
                    <label style={styles.label}>Package</label>
                    <input name="package" defaultValue={initialData?.package} style={styles.input} required />
                </div>
            </div>

            <ImageUpload
                label="Student Image"
                name="image"
                initialImage={initialData?.image ? `${API_BASE_URL}/uploads/${initialData.image}` : undefined}
                isRequired={!initialData}
            />

            <ImageUpload
                label="Company Logo"
                name="companyLogo"
                initialImage={initialData?.companyLogo ? `${API_BASE_URL}/uploads/${initialData.companyLogo}` : undefined}
                isRequired={!initialData}
            />

            <div style={styles.formActions}>
                <button type="submit" style={styles.submitButton}>{initialData ? 'Update Placement' : 'Create Placement'}</button>
                <button type="button" onClick={onCancel} style={styles.cancelButton}>Cancel</button>
            </div>
        </form>
    );
};



const HeroImageForm = ({ onFormSubmit, initialData , onCancel }: { onFormSubmit: (data: FormData) => void; initialData?:HeroImage | null; onCancel: () => void }) => {
    return (
        <form onSubmit={(e) => { e.preventDefault(); onFormSubmit(new FormData(e.currentTarget)); }} style={styles.form}>
            <div style={styles.formGroup}>
                <label style={styles.label}>Title</label>
                <input name="title" style={styles.input} defaultValue={initialData?.title} placeholder="e.g., Main Campus View" required />
            </div>
            <div style={styles.formRow}>
                <div style={{flex: 1, marginRight: '10px'}}>
                    <ImageUpload label="Desktop Image" name="desktopImage" initialImage={initialData?.desktopImage ? `${API_BASE_URL}/uploads/${initialData.desktopImage}`: undefined} icon={<DesktopIcon />} isRequired={true} />
                </div>
                <div style={{flex: 1, marginLeft: '10px'}}>
                    <ImageUpload label="Mobile Image" name="mobileImage" initialImage={initialData?.mobileImage ? `${API_BASE_URL}/uploads/${initialData.mobileImage}`: undefined} icon={<MobileIcon />} isRequired={true} />
                </div>
            </div>
            <div style={styles.formActions}><button type="submit" style={styles.submitButton}>{initialData ? 'Update Hero Image' : 'CreateNew Hero Image'}</button><button type="button" onClick={onCancel} style={styles.cancelButton}>Cancel</button></div>
        </form>
    );
};


const AnnouncementForm = ({ onFormSubmit, initialData, onCancel}: { onFormSubmit: (data: FormData) => void; initialData?: Announcement | null; onCancel: () => void; }) => {
  return (
    <form onSubmit={(e) => { e.preventDefault(); onFormSubmit(new FormData(e.currentTarget));}} style={styles.form}>
      {/* Date Field */}
      <div style={styles.formGroup}>
        <label style={styles.label}>Date</label>
        {/* <input type="date" name="date" style={styles.input} defaultValue={initialData?.date} required/> */}
        <input name="date" type="date" defaultValue={initialData?.date ? new Date(initialData.date).toISOString().split('T')[0] : ''} style={styles.input} required />
      </div>

      {/* Title Field */}
      <div style={styles.formGroup}>
        <label style={styles.label}>Title</label>
        <input
          name="title"
          style={styles.input}
          defaultValue={initialData?.title}
          placeholder="e.g., Republic Day Celebration"
          required
        />
      </div>

      {/* Path Field */}
      <div style={styles.formGroup}>
        <label style={styles.label}>Path (URL)</label>
        <input
          type="url"
          name="path"
          style={styles.input}
          defaultValue={initialData?.path}
          placeholder="e.g., https://example.com"
          required
        />
      </div>

      {/* Description Field */}
      <div style={styles.formGroup}>
        <label style={styles.label}>Description</label>
        <textarea
          name="description"
          style={styles.textarea}
          defaultValue={initialData?.description}
          placeholder="Enter announcement details..."
          required
        />
      </div>

      {/* Form Actions */}
      <div style={styles.formActions}>
        <button type="submit" style={styles.submitButton}>
          {initialData ? "Update Announcement" : "Create Announcement"}
        </button>
        <button type="button" onClick={onCancel} style={styles.cancelButton}>
          Cancel
        </button>
      </div>
    </form>
  );
};




// --- LIST COMPONENT ---
const ItemsList = ({ items, onEditItem, onDeleteItem, columns }: { items: any[], onEditItem: (item: any) => void, onDeleteItem: (id: string, code?:string) => void, columns: { header: string, accessor: (item: any) => React.ReactNode }[] }) => (
    <div style={styles.contentCard}>
        <div className="table-container" style={styles.tableContainer}>
            <table style={styles.table}>
                <thead><tr>{columns.map(c => <th key={c.header} style={styles.th}>{c.header}</th>)}<th style={styles.th}>Actions</th></tr></thead>
                <tbody>
                    {items.length > 0 ? items.map(item => (
                        <tr key={item._id} className="table-row">{columns.map((c, i) => 
                            <td key={i} style={styles.td}>{c.accessor(item)}</td>)}<td style={styles.td}>
                                <div style={styles.actionButtonContainer}>
                                    <button onClick={() => onEditItem(item)} style={{...styles.actionButton, color: 'var(--primary-color)'}} title="Edit"><EditIcon /></button>
                                    <button onClick={() => onDeleteItem(item._id, item.code)} style={{...styles.actionButton, color: 'var(--danger-color)'}} title="Delete"><CrossIcon /></button>
                                </div>
                            </td>
                        </tr>)) : 
                        <tr>
                            <td colSpan={columns.length + 1} style={{textAlign: 'center', padding: '40px'}}>No items to display.</td>
                        </tr>}
                </tbody>
            </table>
        </div>
    </div>
);


// --- Main AdminDashboard Component ---
const AdminDashboard = () => {
    const [profileOpen, setProfileOpen] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [openMenu, setOpenMenu] = useState('Departments');
    const [activeView, setActiveView] = useState('Departments > List');
    const [items, setItems] = useState<any[]>([]);
    const [editingItem, setEditingItem] = useState<any | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const {  token ,setToken, setRender } = useContext(StoreContext);
    const navigate = useNavigate();
    const menuConfig = {
        'Departments': { endpoint: 'department', 
            listColumns: [{ header: 'Code', 
                accessor: (item: Department) => item.code }, 
                { header: 'BackGround IMG', accessor: (item: Department) => <img src={`${API_BASE_URL}/uploads/${item.heroImage}`} alt={item.code} style={styles.tableImage} /> },
                { header: 'HOD Image', accessor: (item: Department) => <img src={`${API_BASE_URL}/uploads/${item.hodImage}`} alt={item.hodName} style={styles.tableImage} /> },
                { header: 'Name', accessor: (item: Department) => item.name }, 
                { header: 'HOD', accessor: (item: Department) => item.hodName },
                // { header: 'Message', accessor: (item: Department) => item.hodMessage},
                // { header: 'About', accessor: (item: Department) => item.about},
                // { header: 'Vision', accessor: (item: Department) => item.vision},
                // { header: 'Mission', accessor: (item: Department) => item.mission},
                // { header: 'Faculty', accessor: (item: Department) => item.faculty},
                ] },
        
        'News & Events': { endpoint: 'newsEvents', 
            listColumns: [ { header: 'Image', 
                accessor: (item: NewsEvent) => <img src={`${API_BASE_URL}/uploads/${item.image}`} alt={item.title} style={styles.tableImage} />}, 
                { header: 'Title', accessor: (item: NewsEvent) => item.title }, 
                // { header: 'Type', accessor: (item: NewsEvent) => <span style={item.type === 'Event' ? styles.eventBadge : styles.newsBadge}>{item.type}</span> }, 
                { header: 'Type', accessor: (item: NewsEvent) => <span style={styles.eventBadge}>{item.type}</span> }, 
                { header: 'BG Color', accessor: (item: NewsEvent) => <div style={{...styles.colorSwatch, backgroundColor: item.bgColor}}></div> }, 
                { header: 'Date', accessor: (item: NewsEvent) => new Date(item.date).toLocaleDateString() }
                 ] },
        'Hero Images': { endpoint: 'heroImage', 
            listColumns: [{ 
                header: 'Desktop', accessor: (item: HeroImage) => <img src={`${API_BASE_URL}/uploads/${item.desktopImage}`} alt={item.title} style={styles.tableImage} /> }, 
                { header: 'Mobile', accessor: (item: HeroImage) => <img src={`${API_BASE_URL}/uploads/${item.mobileImage}`} alt={item.title} style={styles.tableImage} /> }, 
                { header: 'Title', accessor: (item: HeroImage) => item.title 
                }] },
        'Announcements': { endpoint: 'announcement', 
            listColumns: [
                { header: 'Date', accessor: (item: Announcement) => new Date(item.date).toLocaleDateString()}, 
                { header: 'Title', accessor: (item: Announcement) => item.title },
                { header: 'Path', accessor: (item: Announcement) => item.path },
                { header: 'Description', accessor: (item: Announcement) => item.description },
                ] },

        'Placements': { endpoint: 'placement', 
            listColumns: [ 
                { header: 'Student Name', accessor: (item: Placement) => item.student}, 
                { header: 'Company', accessor: (item: Placement) => item.company}, 
                { header: 'Package', accessor: (item: Placement) => item.package},
                { header: 'image', accessor: (item: Placement) => <img src={`${API_BASE_URL}/uploads/${item.image}`} alt={item.student} style={styles.tableImage} />}, 
                { header: 'Company Logo', accessor: (item: Placement) => <img src={`${API_BASE_URL}/uploads/${item.companyLogo}`} alt={item.student} style={styles.tableImage} />}, 
                 ] },
    };

    const fetchData = useCallback(async () => {
        const [menu] = activeView.split(' > ');
        const config = menuConfig[menu as keyof typeof menuConfig];
        if (!config) return; setLoading(true); setError(null);
        try {
            const listRoute = config.endpoint === 'department' ? 'list' : 'list';
            const response = await fetch(`${API_BASE_URL}/api/${config.endpoint}/${listRoute}`);
            if (!response.ok) throw new Error(`Failed to fetch ${menu}`);
            const data = await response.json();
            console.log(data);
            setItems(Array.isArray(data) ? data : []);
            console.log("here    ",items);
        } catch (err: any) { setError(err.message); setItems([]); } finally { setLoading(false); }
    }, [activeView]);

    useEffect(() => { if (activeView.endsWith(' > List')) { fetchData(); } }, [activeView, fetchData]);

    const handleFormSubmit = async (formData: FormData) => {
        const [menu] = activeView.split(' > ');
        const config = menuConfig[menu as keyof typeof menuConfig];
        if (!config) return;
        const isUpdating = !!editingItem; 
        const _id = isUpdating ? editingItem._id : ''; 
        // const code = isUpdating ? editingItem.code : (formData.get('code') as string); 
        const method = isUpdating ? 'PUT' : 'POST';
        let endpoint: string;
        if (config.endpoint === 'department') { 
            endpoint = isUpdating ? `${API_BASE_URL}/api/department/update/${_id}` : `${API_BASE_URL}/api/department/add`; 
        } 
        else {
             endpoint = isUpdating ? `${API_BASE_URL}/api/${config.endpoint}/update/${_id}` : `${API_BASE_URL}/api/${config.endpoint}/add`; }
        setLoading(true); setError(null);
        try {
            // console.log(endpoint,formData);
            const response = await fetch(endpoint, { method, body: formData });
            const result = await response.json();
            if (!response.ok) throw new Error(result.message || result.error || 'An error occurred.');
            alert(`Item ${isUpdating ? 'updated' : 'added'} successfully!`);
            setEditingItem(null); setActiveView(`${menu} > List`);
        } catch (err: any) { setError(err.message); } finally { setLoading(false); }
    };
    
    const handleDeleteItem = async (_id: string, code?: string) => {
        const [menu] = activeView.split(' > ');
        const config = menuConfig[menu as keyof typeof menuConfig];
        if (!config || !window.confirm('Are you sure you want to delete this item?')) return;
        const endpoint = `${API_BASE_URL}/api/${config.endpoint}/delete/${_id}`;
        // const endpoint = config.endpoint === 'department' && code ? `${API_BASE_URL}/api/department/delete/code/${code}` : `${API_BASE_URL}/api/${config.endpoint}/delete/${id}`;
        setLoading(true); setError(null);
        try {
            const response = await fetch(endpoint, { method: 'DELETE' });
            if (!response.ok) { const result = await response.json(); throw new Error(result.message || result.error || 'Failed to delete.'); }
            alert('Item deleted successfully!'); fetchData();
        } catch (err: any) { setError(err.message); } finally { setLoading(false); }
    };

    const handleEditItem = (item: any) => { 
        const [menu] = activeView.split(' > ');
        // console.log(menu);
        // console.log(item);
         setEditingItem(item); 
         setActiveView(`${menu} > Add/Edit`); 
        //  console.log(activeView);
        //  console.log(editingItem);
        };
    const handleCancel = () => { const [menu] = activeView.split(' > '); setEditingItem(null); setActiveView(`${menu} > List`); };

    const renderContent = () => {
        const [menu, subMenu] = activeView.split(' > ');
        const content = () => {
             if (subMenu === 'List') { 
                // console.log(subMenu,menu,items);
                // console.log(menuConfig[menu as keyof typeof menuConfig].listColumns);
                return loading ? <LoadingSpinner /> : <ItemsList items={items} onEditItem={handleEditItem} onDeleteItem={handleDeleteItem} columns={menuConfig[menu as keyof typeof menuConfig].listColumns} />; }
             if (subMenu === 'Add/Edit') {
                if (loading && !editingItem) return <LoadingSpinner />;
                switch (menu) {
                    case 'Departments': return <DepartmentForm onFormSubmit={handleFormSubmit} initialData={editingItem} onCancel={handleCancel} />;
                    case 'News & Events': return <NewsEventForm onFormSubmit={handleFormSubmit} initialData={editingItem} onCancel={handleCancel}/>;
                    case 'Hero Images': return <HeroImageForm onFormSubmit={handleFormSubmit} initialData={editingItem} onCancel={handleCancel} />;
                    case 'Announcements': return <AnnouncementForm onFormSubmit={handleFormSubmit} initialData={editingItem} onCancel={handleCancel} />;
                    case 'Placements': return <PlacementForm onFormSubmit={handleFormSubmit} initialData={editingItem} onCancel={handleCancel} />;
                    default: return <div>Form not found.</div>;
                }
            }
            return <div>Select an option from the sidebar.</div>;
        };
        return (
            <div>
                 <h2 style={styles.contentTitle}>{menu}<span style={{color: 'var(--text-secondary)'}}> / {subMenu === 'Add/Edit' ? (editingItem ? `Edit` : 'Add New') : 'List'}</span></h2>
                 {error && <ErrorMessage message={error} />}
                 {subMenu.includes('Add') ? <div style={styles.contentCard}>{content()}</div> : content()}
            </div>
        );
    };
    
    const menuItems = { 'Departments': ['Add/Edit', 'List'], 'News & Events': ['Add/Edit', 'List'], 'Hero Images': ['Add/Edit', 'List'], 'Announcements':['Add/Edit', 'List'], 'Placements':['Add/Edit', 'List'], };
    const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setRender(false);
    // navigate('/');
    }
    return (
        <>
        {/* // ReactDOM.createPortal(
        //     <div className="fixed inset-0 bg-white z-50 overflow-y-auto"> */}
            <div style={styles.dashboardContainer}>
                <header style={styles.header}>
                    <div style={styles.headerLeft}>
                        <button className="hamburger-menu" style={styles.hamburgerMenu} onClick={() => setSidebarOpen(!sidebarOpen)}><MenuIcon/></button>
                        <div className="desktop-logo"><Logo/></div>
                    </div>
                    <div style={styles.headerTitle}>Admin Dashboard</div>
                    <div style={styles.headerRight}>
                        <div style={{position: 'relative'}} onClick={() => setProfileOpen(!profileOpen)}>
                            <UserProfileIcon />
                            {profileOpen && (<div style={styles.profileDropdown}>
                                <div style={styles.dropdownItem}>admin@vignan.ac.in</div>
                            <div onClick={logout} style={{...styles.dropdownItem, ...styles.logoutButton}}>Logout</div></div>)}
                        </div>
                    </div>
                </header>
                <div style={styles.dashboardBody}>
                    {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)}></div>}
                    <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
                        <nav>
                            <ul>{Object.keys(menuItems).map(menuName => 
                                (<li key={menuName} style={styles.menuItem}>
                                    <div onClick={() => setOpenMenu(openMenu === menuName ? null : menuName)} style={styles.menuTitle}>
                                        <span>{menuName}</span>
                                        <span style={styles.menuIconContainer}>{openMenu === menuName ? <MinusSquareIcon /> : <PlusSquareIcon />}</span>
                                    </div>
                                    <ul className="submenu" style={openMenu === menuName ? {...styles.subMenu, ...styles.subMenuOpen} : styles.subMenu}>
                                        {menuItems[menuName as keyof typeof menuItems].map(subItem =>
                                            (<li key={subItem} onClick={() => { setActiveView(`${menuName} > ${subItem}`); setSidebarOpen(false); setEditingItem(null); }} className={activeView.startsWith(`${menuName} > ${subItem}`) ? 'submenu-item-active' : 'submenu-item'}>
                                                {subItem === 'Add/Edit' ? 'Add / Edit' : subItem}
                                            </li>)
                                        )}
                                    </ul>
                                </li>))}
                            </ul>
                        </nav>
                    </aside>
                    <main className="main-content" style={styles.mainContent}>{renderContent()}</main>
                </div>
            </div>
            <style>{`
                /* --- THEME & FONT DEFINITIONS --- */
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
                :root {
                    --primary-color: #0052cc;
                    --primary-color-light: #deebff;
                    --accent-color: #00b8d9;
                    --danger-color: #de350b;
                    --success-color: #00875a;
                    --text-primary: #172b4d;
                    --text-secondary: #5e6c84;
                    --background-light: #f4f5f7;
                    --surface-color: #ffffff;
                    --border-color: #dfe1e6;
                }

                /* --- GENERAL STYLES --- */
                body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; }
                .sidebar { position: relative; transition: transform 0.3s ease-in-out; background-color: #172B4D; color: #ffffff; width: 260px; border-right: none; padding: 20px; overflow-y: auto; flex-shrink: 0; }
                .main-content { transition: margin-left 0.3s ease-in-out; }
                .hamburger-menu { display: none; background: none; border: none; cursor: pointer; padding: 5px; z-index: 1002; }
                .sidebar-overlay { display: none; }
                .submenu-item, .submenu-item-active { padding: 10px 15px; cursor: pointer; border-radius: 6px; font-size: 0.95rem; margin-bottom: 5px; transition: background-color 0.2s, color 0.2s; position: relative; }
                .submenu-item { color: #B3BAC5; }
                .submenu-item:hover { background-color: rgba(255, 255, 255, 0.1); color: #ffffff; }
                .submenu-item-active { background-color: var(--primary-color); color: #ffffff; font-weight: 500; }
                .table-row:hover { background-color: var(--primary-color-light); }
                .upload-box:hover .upload-overlay { opacity: 1; }
                input:focus, textarea:focus, select:focus { border-color: var(--primary-color) !important; box-shadow: 0 0 0 3px var(--primary-color-light) !important; outline: none; }

                /* --- MOBILE-SPECIFIC STYLES --- */
                @media (max-width: 768px) {
                    .sidebar-overlay { display: block; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5); z-index: 1000; }
                    .sidebar { position: fixed; transform: translateX(-100%); height: 100%; z-index: 1001; box-shadow: 4px 0 15px rgba(0,0,0,0.2); }
                    .sidebar.open { transform: translateX(0); }
                    .main-content { margin-left: 0 !important; }
                    .hamburger-menu { display: block; }
                    .desktop-logo { display: none; }
                    .header-title { font-size: 1.2rem; }
                    .form-row { flex-direction: column; }
                    .form-row > div { margin: 0 0 20px 0 !important; }
                    .table-container { overflow-x: auto; }
                }
            `}</style>
        {/* </div>,document.body) */}
        </>
    );
};

// --- Centralized & Enhanced Styles ---
const styles: { [key: string]: CSSProperties } = {

  // ADD THESE TO YOUR EXISTING styles OBJECT

  dashboardContainer: { display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: 'var(--background-light)' },
  header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 24px', backgroundColor: 'var(--surface-color)', borderBottom: '1px solid var(--border-color)', zIndex: 999, flexShrink: 0 },
  headerLeft: { flex: 1, display: 'flex', alignItems: 'center' },
  headerTitle: { flex: 2, textAlign: 'center', fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-primary)' },
  headerRight: { flex: 1, display: 'flex', justifyContent: 'flex-end' },
  dashboardBody: { display: 'flex', flex: 1, overflow: 'hidden', position: 'relative' },
  mainContent: { flex: 1, padding: '32px', overflowY: 'auto', backgroundColor: 'var(--background-light)' },
  profileDropdown: { position: 'absolute', top: '55px', right: 0, backgroundColor: 'var(--surface-color)', borderRadius: '8px', boxShadow: '0 8px 16px -4px rgba(9, 30, 66, 0.25), 0 0 1px rgba(9, 30, 66, 0.31)', border: '1px solid var(--border-color)', width: '220px', overflow: 'hidden', zIndex: 1002, color: 'var(--text-primary)' },
  dropdownItem: { padding: '12px 20px', borderBottom: '1px solid var(--border-color)', fontSize: '0.95rem' },
  logoutButton: { color: 'var(--danger-color)', fontWeight: 500, borderBottom: 'none' },
  menuItem: { listStyle: 'none', marginBottom: '5px' },
  menuTitle: { fontSize: '1.05rem', fontWeight: 600, padding: '12px 10px', cursor: 'pointer', borderRadius: '6px', color: '#ffffff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  menuIconContainer: { display: 'flex', alignItems: 'center', transition: 'transform 0.3s ease' },
  subMenu: { listStyle: 'none', paddingLeft: '15px', overflow: 'hidden', maxHeight: '0', transition: 'max-height 0.3s ease-out' },
  subMenuOpen: { maxHeight: '500px', transition: 'max-height 0.4s ease-in' },
  contentCard: { backgroundColor: 'var(--surface-color)', borderRadius: '12px', padding: '32px', boxShadow: '0 1px 3px 0 rgba(9,30,66,0.15), 0 0 1px 0 rgba(9,30,66,0.31)', transition: 'box-shadow 0.3s ease' },
  contentTitle: { fontSize: '1.75rem', fontWeight: 700, marginBottom: '25px', color: 'var(--text-primary)' },
  form: { display: 'flex', flexDirection: 'column' },
  formGroup: { marginBottom: '24px' },
  formRow: { display: 'flex', marginBottom: '0' },
  label: { display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.9rem' },
  input: { width: '100%', padding: '12px 15px', border: '1px solid var(--border-color)', borderRadius: '6px', fontSize: '1rem', boxSizing: 'border-box', transition: 'border-color 0.2s, box-shadow 0.2s' },
  textarea: { width: '100%', padding: '12px 15px', border: '1px solid var(--border-color)', borderRadius: '6px', minHeight: '120px', fontSize: '1rem', transition: 'border-color 0.2s, box-shadow 0.2s' },
  uploadBox: { cursor: 'pointer', border: '2px dashed var(--border-color)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '150px', backgroundColor: '#fafbfc', position: 'relative', overflow: 'hidden', transition: 'border-color 0.2s' },
  uploadPlaceholder: { display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'var(--text-secondary)', fontWeight: 500 },
  uploadPreview: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' },
  uploadOverlay: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(9, 30, 66, 0.5)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity 0.3s ease', fontWeight: 600 },
  formActions: { display: 'flex', gap: '10px', marginTop: '20px' },
  submitButton: { padding: '12px 30px', backgroundColor: 'var(--primary-color)', color: '#ffffff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '1rem', fontWeight: 500, transition: 'background-color 0.2s, box-shadow 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' },
  cancelButton: { padding: '12px 30px', backgroundColor: 'var(--text-secondary)', color: '#ffffff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '1rem', fontWeight: 500, transition: 'background-color 0.2s' },
  addButton: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', padding: '8px 15px', backgroundColor: 'var(--primary-color-light)', color: 'var(--primary-color)', border: 'none', borderRadius: '6px', cursor: 'pointer', marginTop: '5px', alignSelf: 'flex-start', fontWeight: 600, transition: 'background-color 0.2s' },
  removeButton: { background: 'none', border: 'none', cursor: 'pointer', padding: '5px', marginLeft: '10px', color: 'red', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background-color 0.2s, color 0.2s' },
  tableContainer: { overflowX: 'auto'},
  table: { width: '100%', borderCollapse: 'collapse', minWidth: '600px' },
//   table: { width: '100%', borderCollapse: 'collapse', minWidth: '1100px' },
  th: { padding: '15px', textAlign: 'left', borderBottom: '2px solid var(--border-color)', fontWeight: 600, color: 'var(--text-secondary)', backgroundColor: 'var(--background-light)' },
  td: { padding: '15px', textAlign: 'left', borderBottom: '1px solid var(--border-color)', verticalAlign: 'middle', color: 'var(--text-primary)' },
  tableImage: { width: '80px', height: '60px', objectFit: 'cover', borderRadius: '6px' },
  actionButtonContainer: { display: 'flex', alignItems: 'center' },
  actionButton: { background: 'none', border: 'none', cursor: 'pointer', padding: '5px', marginLeft: '5px' },
  spinner: { border: '5px solid var(--primary-color-light)', borderTop: '5px solid var(--primary-color)', borderRadius: '50%', width: '50px', height: '50px', animation: 'spin 1s linear infinite', margin: '50px auto' },
  errorBanner: { padding: '15px', backgroundColor: '#ffebe6', color: '#bf2600', border: '1px solid #ffbdad', borderRadius: '8px', marginBottom: '20px' },
  colorPickerWrapper: { display: 'flex', alignItems: 'center', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '6px', cursor: 'pointer' },
  colorPickerSwatch: { width: '40px', height: '40px', borderRadius: '4px', border: '1px solid var(--border-color)' },
  colorPickerValue: { marginLeft: '10px', fontSize: '1rem', color: 'var(--text-secondary)'},
  newsBadge: { backgroundColor: 'var(--success-color)', color: 'white', padding: '4px 10px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 600 },
  eventBadge: { backgroundColor: 'var(--accent-color)', color: 'white', padding: '4px 10px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 600 },
  colorSwatch: { width: '25px', height: '25px', borderRadius: '50%', border: '1px solid var(--border-color)' },
};

export default AdminDashboard;