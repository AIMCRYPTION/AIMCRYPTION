'use strict'
/**
 * config.js
 * Provides all essential config constants
 ******************************/

// Fixed constants
const VIEWS_BASE_URI = `file://${__dirname}/static`

module.exports = {
    REPO: {
        URL: 'https://github.com/AIMCRYPTION/AIMCRYPTION/',
        RELEASES_API_URL: 'https://api.github.com/repos/AIMCRYPTION/AIMCRYPTION/releases/latest',
        FORK: 'https://github.com/AIMCRYPTION/AIMCRYPTION/fork',
        DOCS: 'https://github.com/AIMCRYPTION/AIMCRYPTION#readme',
        REPORT_ISSUE: 'https://github.com/AIMCRYPTION/AIMCRYPTION/issues/new'
    },
    WINDOW_OPTS: {
        center: true,
        show: true,
        titleBarStyle: 'hiddenInset',
        resizable: false,
        maximizable: false,
        movable: true,
        webPreferences: {
            nodeIntegration: true
        }
    },
    VIEWS: {
        BASE_URI: VIEWS_BASE_URI,
        MASTERPASSPROMPT: `${VIEWS_BASE_URI}/masterpassprompt.html`,
        SETUP: `${VIEWS_BASE_URI}/setup.html`,
        CRYPTER: `${VIEWS_BASE_URI}/crypter.html`,
        SETTINGS: `${VIEWS_BASE_URI}/settings.html`
    },
    CRYPTO: {
        ENCRYPTION_TMP_DIR: '.encrypting',
        DECRYPTION_TMP_DIR: '.decrypting',
        FILE_DATA: 'data',
        FILE_CREDS: 'creds',
        MASTERPASS_CREDS_FILE: 'credentials.aim',
        MASTERPASS_CREDS_PROPS: ['mpkhash', 'mpksalt', 'mpsalt'],
        DECRYPT_OP: 'Decrypted',
        DECRYPT_TITLE_PREPEND: 'Decrypted ',
        ENCRYPT_OP: 'Encrypted',
        EXT: '.crypto',
        DEFAULTS: {
            // Crypto default constants
            ITERATIONS: 50000, // file encryption key derivation iterations
            KEYLENGTH: 32, // encryption key length
            IVLENGTH: 12, // initialisation vector length
            ALGORITHM: 'aes-256-gcm', // encryption algorithm
            DIGEST: 'sha256', // digest function
            HASH_ALG: 'sha256', // hashing function
            MPK_ITERATIONS: 1000000 // MasterPassKey derivation iterations
        }
    },
    REGEX: {
        APP_EVENT: /^app:[\w-]+$/i,
        ENCRYPTION_CREDS: /^AIM(.*)$/gim,
        MASTERPASS: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@!%*#?&]).{12,}$/
    },
    RESPONSES: {
        invalid: 'MUST AT LEAST CONTAIN 1 UPPER & LOWER CASE ALPHABET, 1 NUMBER, 1 SYMBOL AND BE 12 CHARACTERS',
        correct: 'CORRECT MASTERPASS',
        incorrect: 'INCORRECT MASTERPASS',
        setSuccess: 'MASTERPASS SUCCESSFULLY SET',
        empty: 'PLEASE ENTER THE MASTERPASS',
        resetSuccess: "You Have Successfully Reset Your MasterPass. You'll Be Redirected To Verify It Shortly.",
        exportSuccess: 'Successfully Exported The Credentials',
        importSuccess: 'Successfully Imported The Credentials. You Will Need To Verify The MasterPass For The Credentials Imported After Aimcryption Relaunches.'
    },
    ERRORS: {
        INVALID_MP_CREDS_FILE: 'Not A Valid Or Corrupted Credentials fFile!',
        INVALID_FILE: 'Not A Valid Or Corrupted Crypto File!',
        AUTH_FAIL: 'Corrupted Aimcryption File Or Trying To Decrypt On A Different Machine!',
        PROMISE: 'Oops, We Encountered A Problem...',
        DECRYPT: 'Not A Aimcryption File (Can Not Get Salt, Iv and AuthTag)',
        MS: {
            INVALID_FILE: 'Invalid Tar Header. Maybe The Tar Is Corrupted Or It Needs To Be Gunzipped?',
            AUTH_FAIL: 'Unsupported State Or Unable To Authenticate Data'
        }
    },
    COLORS: {
        bad: '#dc3545',
        good: '#28a745',
        highlight: '#333333'
    },
    SETTINGS: {
        RELAUNCH_TIMEOUT: 4000
    }
}