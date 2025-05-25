import React, { useState, useRef } from 'react';

const initialProfile = {
  name: "Chocolate Parfait",
  email: "parfait@email.com",
  image: "",
};

function Profile() {
  const [profile, setProfile] = useState(initialProfile);
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState(profile);
  const fileInputRef = useRef(null);

  const handleChange = e => {
    const { name, value, files } = e.target;
    if (name === "image" && files[0]) {
      setForm({ ...form, image: URL.createObjectURL(files[0]) });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSave = e => {
    e.preventDefault();
    setProfile(form);
    setEdit(false);
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white rounded-2xl shadow-2xl p-8">
      <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">Profile</h2>
      <div className="flex flex-col items-center mb-6">
        <div className="relative w-28 h-28 rounded-full bg-blue-100 flex items-center justify-center shadow-lg mb-2 border-4 border-white overflow-hidden group">
          {form.image || profile.image ? (
            <img
              src={edit ? form.image : profile.image}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-4xl font-bold text-blue-700">{profile.name[0]}</span>
          )}
          {edit && (
            <>
              <button
                type="button"
                onClick={handleImageClick}
                className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                tabIndex={-1}
              >
                <span className="px-3 py-1 bg-blue-600 text-white rounded shadow font-semibold text-sm hover:bg-blue-700 transition">
                  Choose Image
                </span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                className="hidden"
              />
            </>
          )}
        </div>
        {!edit && (
          <>
            <div className="font-semibold text-lg text-blue-700">{profile.name}</div>
            <div className="text-gray-600">{profile.email}</div>
          </>
        )}
      </div>
      {edit ? (
        <form onSubmit={handleSave} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Profile Image</label>
            <button
              type="button"
              onClick={handleImageClick}
              className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-semibold shadow hover:bg-blue-100 transition"
            >
              Choose Image
            </button>
            <input
              ref={fileInputRef}
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="hidden"
            />
            {form.image && (
              <div className="mt-2">
                <img src={form.image} alt="Preview" className="w-16 h-16 rounded-full object-cover border-2 border-blue-200" />
              </div>
            )}
          </div>
          <div className="flex gap-3">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Save
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition"
              onClick={() => setEdit(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <button
          className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-semibold hover:bg-blue-100 transition w-full"
          onClick={() => setEdit(true)}
        >
          Edit Profile
        </button>
      )}
    </div>
  );
}

export default Profile;
