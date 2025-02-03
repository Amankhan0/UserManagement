export const checkUserValidation = (json: any): Promise<Record<string, string>> => {
    var errorJson: Record<string, string> = {}; // Explicitly type errorJson

    return new Promise((resolve) => {
        if (!json.fullName || json.fullName === '') {
            Object.assign(errorJson, { fullName: 'Full name is required' });
        }
        if (!json.email || json.email === '') {
            Object.assign(errorJson, { email: 'Full name is required' });
        }
        if (!json.contactno || json.contactno === '') {
            Object.assign(errorJson, { contactno: 'Full name is required' });
        }
        if (!json.state || json.state === '') {
            Object.assign(errorJson, { state: 'State is required' });
        }
        if (!json.city || json.city === '') {
            Object.assign(errorJson, { city: 'City is required' });
        }
        if (!json.address || json.address === '') {
            Object.assign(errorJson, { address: 'City is required' });
        }
        if (!json.roleType || json.roleType === '') {
            Object.assign(errorJson, { roleType: 'Role type is required' });
        }
        if (!json.roleId || json.roleId === '') {
            Object.assign(errorJson, { roleId: 'Role is required' });
        }
        resolve(errorJson);
    });
};