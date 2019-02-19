class AbstractSender {

    /**
     *
     * @param {string} evt
     * @param {Function} callback
     */
    on(evt, callback) {
        throw 'Must be implement'
    }
}
