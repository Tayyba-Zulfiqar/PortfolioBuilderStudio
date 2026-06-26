
import SocialLinkRow from './SocialLinkRow';
import './SocialLinksInput.css';

const SocialLinksInput = ({ register, errors }) => {
    const socialLinks = ['github', 'linkedin', 'twitter', 'youtube'];

    return (
        <div className="social-links-section">
            <h2 className="editor-section-subtitle">Social Links</h2>
            <div className="social-links-list">
                {socialLinks.map((name) => (
                    <SocialLinkRow
                        key={name}
                        name={name}
                        register={register}
                        error={errors[name]}
                    />
                ))}
            </div>
        </div>
    );
};

export default SocialLinksInput;