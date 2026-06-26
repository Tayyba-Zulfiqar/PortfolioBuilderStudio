import React, { useRef } from 'react';
import './ProfilePictureUpload.css';

const ProfilePictureUpload = ({ previewImage, onImageChange }) => {
    const fileInputRef = useRef(null);

    // ✅ Image compression function
    const compressImage = (file) => {
        return new Promise((resolve, reject) => {
            // Check file size first (reject if > 5MB)
            if (file.size > 5 * 1024 * 1024) {
                reject(new Error('Image must be less than 5MB'));
                return;
            }

            // Check file type
            if (!file.type.startsWith('image/')) {
                reject(new Error('Please upload an image file'));
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const MAX_WIDTH = 800;
                    const MAX_HEIGHT = 800;
                    let width = img.width;
                    let height = img.height;

                    // Calculate new dimensions (maintain aspect ratio)
                    if (width > height) {
                        if (width > MAX_WIDTH) {
                            height = Math.round((height * MAX_WIDTH) / width);
                            width = MAX_WIDTH;
                        }
                    } else {
                        if (height > MAX_HEIGHT) {
                            width = Math.round((width * MAX_HEIGHT) / height);
                            height = MAX_HEIGHT;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx.imageSmoothingEnabled = true;
                    ctx.imageSmoothingQuality = 'high';
                    ctx.drawImage(img, 0, 0, width, height);

                    // Compress to JPEG with 80% quality (reduces size significantly)
                    const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.8);
                    resolve(compressedDataUrl);
                };
                img.onerror = () => {
                    reject(new Error('Failed to load image'));
                };
                img.src = e.target.result;
            };
            reader.onerror = () => {
                reject(new Error('Failed to read file'));
            };
            reader.readAsDataURL(file);
        });
    };

    const handleClick = () => fileInputRef.current?.click();

    const handleChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            // Compress the image
            const compressed = await compressImage(file);

            // Pass the compressed image to parent
            onImageChange(compressed);

            // Reset input so same file can be re-uploaded
            e.target.value = '';
        } catch (error) {
            // Show error to user
            alert(error.message || 'Failed to upload image. Please try again.');
            e.target.value = '';
        }
    };

    return (
        <div className="about-avatar-row">
            <div className="about-avatar-wrap" onClick={handleClick} title="Click to upload a new photo">
                <div className="about-avatar">
                    {previewImage ? (
                        <img src={previewImage} alt="Profile" />
                    ) : (
                        <div className="about-avatar__placeholder">🌸</div>
                    )}
                </div>
                <div className="about-avatar__plus">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                </div>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="about-avatar__file-input"
                    onChange={handleChange}
                    id="profile-picture-input"
                />
            </div>
            <div className="about-avatar-info">
                <span className="about-avatar-label">Profile Picture</span>
                <span className="about-avatar-hint">Click to upload a new photo</span>
            </div>
        </div>
    );
};

export default ProfilePictureUpload;