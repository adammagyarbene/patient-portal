interface Patient {
  userId?: string;
  sureName?: string;
  familyName?: string;
  gender?: string;
}

const fetchPatients = async ({
  userId,
  sureName,
  familyName,
  gender,
}: Patient) => {
  const params = new URLSearchParams();
  if (userId) params.append("userId", String(userId));
  if (familyName && Boolean(familyName.length))
    params.append("familyName", familyName);
  if (sureName && Boolean(sureName.length)) params.append("sureName", sureName);
  if (gender && Boolean(gender.length)) params.append("gender", gender);

  const queryString = params.toString();

  const res = await fetch(`/api/patients?${queryString}`);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }

  return data;
};

export default fetchPatients;
