import React, { use } from 'react'
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router';
import { useEffect } from 'react';
import api from '../lib/axios.js';
import Navbar from "../components/Navbar.jsx";
import toast from 'react-hot-toast';
import { ArrowLeftIcon, LoaderIcon } from 'lucide-react';  
import { Link } from 'react-router';
import { Trash2Icon } from 'lucide-react';


const NoteDetailPage = () => {

  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [originalNote, setOriginalNote] = useState(null);
  const [showDelete, setShowDelete] = useState(false);

  const navigate = useNavigate();

  const {id} = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
        setOriginalNote(res.data);
      } catch (error) {
        toast.error("Failed to fetch the note.");
        console.log("Error fetching note: ", error);
        navigate("/");
      } finally {
        setLoading(false);
      }
    } 
    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted successfully.");
      navigate("/");
    } catch (error) {
      toast.error("Failed to delete note.");
      console.log("Error deleting note: ", error);
    } finally {
      setShowDelete(false);
    }
  }

  const handleSave = async () => {
    if(!note.title || !note.content) {
      toast.error("Title and content are required.");
      return;
    }
    setSaving(true);
    try {
      await api.put(`/notes/${id}`, {
        title: note.title,
        content: note.content
      });
      toast.success("Note updated successfully.");
      setOriginalNote({ title: note.title, content: note.content, _id: note._id });
    } catch (error) {
      console.log("Error updating note: ", error);
      toast.error("Failed to update note.");
    }finally {
      setSaving(false);
    }
  }

  const isChanged = useMemo(() => {
    if (!note || !originalNote) return false;
    return note.title !== originalNote.title || note.content !== originalNote.content;
  }, [note, originalNote]);

  if (loading) {
    return <div className='min-h-screen bg-base-200 flex items-center justify-center'>
      <LoaderIcon className='animate-spin size-10' />
    </div>
  }
  return (
    <div className='min-h-screen bg-base-200'>
      <Navbar />
      <div className='container mx-auto px-4 py-4'>
        <div className='max-w-2xl mx-auto'>
          <div className='sticky top-0 z-10 -mx-4 px-4 py-3 bg-base-200/80 backdrop-blur supports-[backdrop-filter]:bg-base-200/60 border-b border-base-content/10 flex items-center justify-between'>
            <Link to="/" className='btn btn-ghost'>
              <ArrowLeftIcon className='h-5 w-5' />
              Back
            </Link>
            <div className='flex items-center gap-2'>
              <button
                className='btn btn-outline'
                onClick={() => setShowDelete(true)}
              >
                <Trash2Icon className='h-5 w-5' />
                Delete
              </button>
              <button className='btn btn-primary' disabled={saving || !isChanged} onClick={handleSave}>
                {saving ? "Saving..." : isChanged ? "Save Changes" : "Saved"}
              </button>
            </div>
          </div>

          <div className='card bg-base-100 mt-6'>
            <div className='card-body'>
              <div className='form-control mb-4'>
                <label className='label'>
                  <span className="label-text">Title</span>
                </label>
                <input type="text" 
                  placeholder='Note Title'
                  className='input input-bordered'
                  value={note.title}
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                />
              </div>

              <div className='form-control'>
                <label className='label'>
                  <span className="label-text">Content</span>
                </label>
                <textarea 
                  className='textarea textarea-bordered min-h-40 md:min-h-56'
                  placeholder='Write your note here...'
                  value={note.content}
                  onChange={(e) => setNote({ ...note, content: e.target.value })}
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showDelete && (
        <div className='modal modal-open'>
          <div className='modal-box'>
            <h3 className='font-bold text-lg'>Delete this note?</h3>
            <p className='py-2'>This action cannot be undone.</p>
            <div className='modal-action'>
              <button className='btn' onClick={() => setShowDelete(false)}>Cancel</button>
              <button className='btn btn-error' onClick={handleDelete}>Delete</button>
            </div>
          </div>
          <div className='modal-backdrop' onClick={() => setShowDelete(false)} />
        </div>
      )}
    </div>
  )
}

export default NoteDetailPage