import fs from 'fs'
import path from 'path'

const listenersDir = __dirname

async function movieTheaterEventListeners() {
    const files = fs.readdirSync(listenersDir)

    for (const file of files) {
        if (file !== 'index.ts' && file.endsWith('.ts')) {
            const filePath = path.join(listenersDir, file)

            await import(filePath)
        }
    }
}

movieTheaterEventListeners()
    .then(() => console.log('All event listeners were loaded successfully'))
    .catch(err => console.error('Error loading event listeners: ', err))
