const {
    getChildLogger
} = require("../core/logging");
const userRepository = require("../repository/user");
const {
    verifyPassword
} = require("../core/password");
const {
    generateJWT,
    verifyJWT
} = require("../core/jwt");


const checkAndParseSession = async (authHeader) => {
    if (!authHeader) {
        throw new Error("You need to be signed in");
    }

    if (!authHeader.startsWith("Bearer ")) {
        throw new Error("Invalid authentication token");
    }

    const authToken = authHeader.substr(7);

    try {
        const {
            roles,
            id,
        } = await verifyJWT(authToken);
        return {
            id,
            roles,
            authToken,
        };

    } catch (error) {
        const logger = getChildLogger("user-service");
        logger.error(error.message, {
            error
        });
        throw new Error(error.message);
    }
};

const checkRole = (role, roles) => {
    const hasPermission = roles.includes(role);

    if (!hasPermission) {
        throw new Error("You are not allowed to view this part of the application");
    }
};

const debugLog = (message, meta = {}) => {
    if (!this.logger) this.logger = getChildLogger("user-service");
    this.logger.debug(message, meta);
};

const makeExposedUser = ({
    id,
    username,
    roles
}) => ({
    id,
    username,
    roles,
});

const makeLoginData = async (user) => {
    const token = await generateJWT(user);
    return {
        user: makeExposedUser(user),
        token,
    };
};

const login = async (username, password) => {
    const user = await userRepository.findByUsername(username);

    if (!user) {
        throw new Error("Gebruikersnaam en wachtwoord komen niet overeen");
    }

    const passwordValid = await verifyPassword(password, user.password_hash);

    if (!passwordValid) {
        throw new Error("Gebruikersnaam en wachtwoord komen niet overeen");
    }

    return await makeLoginData(user);
};

module.exports = {
    login,
    checkAndParseSession,
    checkRole,
};