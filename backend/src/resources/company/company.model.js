import mongoose from 'mongoose'

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        uniqueCaseInsensitive: true
    },
    slug: {
        type: String
    },
    logoBackground: {
        type: String,
        required: true,
        trim: true,
        default: '#FFFFFF'
    },
    logo: {
        type: String,
        trim: true
    },
    url: {
        type: String,
        required: true,
        trim: true
    },
    stacks: {
        type: [String]
    },
    progLangs: {
        type: [String]
    },
    frontend: {
        type: [String]
    },
    backend: {
        type: [String]
    },
    isHiring: {
        type: Boolean,
        default: true
    },
    offerInternships: {
        type: Boolean,
        default: false
    },
    p: {
        type: Number,
        default: 0,
        min: 0
    },
    location: {
        country: String,
        state: String,
        address: String
    }

})

companySchema.pre('save', function (next) {
    this.slug = slugify(this.name);
    next();
});
function slugify(text) {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
}
export const Company = mongoose.model('company', companySchema)
