const { EmbedBuilder } = require("discord.js");

class Embed {
    constructor() {
        this.embed = new EmbedBuilder();
        this.structureType = 1;
    }

    set(data, structureType = 1) {
        this.structureType = structureType;
        this.structureType === 1 ? this.setCommonFields(data) : this.setStructureTypeTwo(data);
    }

    setCommonFields({ title, description, color, footer, footerIcon, image, thumbnail, author, authorIcon, authorURL }) {
        if (title) this.embed.setTitle(title);
        if (description) this.embed.setDescription(description);
        if (color) this.embed.setColor(color);
        if (footer) this.embed.setFooter({ text: footer, iconURL: footerIcon });
        if (image) this.embed.setImage(image);
        if (thumbnail) this.embed.setThumbnail(thumbnail);
        if (author) this.embed.setAuthor({ name: author, iconURL: authorIcon, url: authorURL });
    }

    setStructureTypeTwo(data) {
        const { title, description, color, image, thumbnail, author, footer, fields, timestamp } = data;
        if (title) this.embed.setTitle(title.content).setURL(title.url);
        if (description) this.embed.setDescription(description);
        if (color) this.embed.setColor(color);
        if (image) this.embed.setImage(image);
        if (thumbnail) this.embed.setThumbnail(thumbnail);
        if (author) this.embed.setAuthor({ name: author.content, iconURL: author.icon, url: author.url });
        if (footer) this.embed.setFooter({ text: footer.content, iconURL: footer.icon });
        if (Array.isArray(fields)) {
            fields.forEach(({ name, value, inline }) => this.embed.addFields({ name, value, inline }));
        }
        if (timestamp) this.embed.setTimestamp(Date.now());
    }

    addField(name, value, inline = false) {
        if (this.structureType === 1) {
            this.embed.addFields({ name, value, inline });
        }
    }

    setURL(url) {
        if (this.structureType === 1) {
            this.embed.setURL(url);
        }
    }

    timestamp() {
        if (this.structureType === 1) {
            this.embed.setTimestamp(Date.now());
        }
    }

    build() {
        return this.embed;
    }
}

module.exports = Embed;
