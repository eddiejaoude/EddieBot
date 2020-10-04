import axios from 'axios';
import { Message, MessageEmbed } from 'discord.js';
import { issueRequestConfig } from '../config';

const req = async(q: string): Promise<any[]> => {
    try {
        issueRequestConfig.params = { q };
        return (await axios(issueRequestConfig)).data.items;
    } catch (err) {
        if(err.response.status === 403) {
            return new Promise((resolve) => {
                setTimeout(async () => {
                    resolve(await req(q));
                }, Number(err.response.headers['x-ratelimit-reset']) * 1000 - Date.now() + 2000);
            });
        }
    }

    return [];
}

/**
 * This command returns a URL for the user to create an issue in the specified github repository
 */
export const command = async (arg: string, embed: MessageEmbed, message: Message) => {
    message.channel.send('To which repository would you like to create an issue?')
    try {
        // await repository name
        let repository = await message.channel.awaitMessages((m: Message) => m.author.id === message.author.id, { max: 1, time: 10000, errors: ['time'] }).then(collected => {
            const res = collected.first();
            if(res) {
                return res.content;
            }
            return 'EddieBot';
        }).catch(() => { throw new Error('You took too long to reply (`10 seconds`). Try again.') });

        // query max length is 256 chars
        repository = encodeURI(repository);
        if(repository.length > 256) {
            repository.substr(0, 256);
        }

        const [ item ] = await req(repository);

        if(!item) {
            return buildErrorMessage(`Could not find repository with name \`${repository}\`.`);
        }
        let url = `${item.html_url}/issues/new`;

        if(arg) {
            url += `?title=${encodeURI(arg)}`;
        }
        return embed
            .setAuthor(item.owner.login, item.owner.avatar_url, item.owner.html_url)
            .setURL(item.html_url)
            .setDescription(`Create a issue to \`${item.full_name}\` by clicking [here](${url}).`);
    } catch (error) {
        return buildErrorMessage(error.message);
    }

    function buildErrorMessage(errorMsg: string) {
        return embed
            .setTitle('Issue (error)')
            .setDescription(description)
            .addField('ERROR', errorMsg)
            .addField('Usage', usage);
    }
}

export const description = 'Create a link for an issue on a github repository';

export const triggers = ['issue'];

export const usage = `${triggers[0]} [title]`;