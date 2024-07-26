import React, { useEffect, useState } from 'react';

const TagPage = () => {
  const [tagCounts, setTagCounts] = useState([]);

  useEffect(() => {
    const fetchTagCounts = async () => {
      const response = await fetch('/api/tags');
      const data = await response.json();
      // Sort tags by count in descending order
      data.sort((a, b) => b.count - a.count);
      setTagCounts(data);
    };

    fetchTagCounts();
  }, []);

  return (
    <div className='workout-details'>
      <h2>Most Popular Tags</h2>
      <ul>
        {tagCounts.map((tag) => (
          <li key={tag._id}>{tag._id}: {tag.count}</li>
        ))}
      </ul>
    </div>
  );
};

export default TagPage;
