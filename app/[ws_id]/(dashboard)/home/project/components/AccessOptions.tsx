const accessOptions = [
  {
    key: 'restricted',
    value: false,
    label: 'Restricted',
    description: (
      <>
        Only directed members can view and edit tasks.
        <br />
        Only administrators can invite members.
      </>
    ),
  },
  {
    key: 'open',
    value: true,
    label: 'Open',
    description: (
      <>
        Anyone can view this project.
        <br />
        Only administrators can invite members.
        <br />
        Only directed members can edit tasks.
      </>
    ),
  },
];

export default accessOptions;
