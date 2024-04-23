// pages/projects/[name].js

import { supabase } from '../../utils/supabase'; // Import Supabase client

export default function ProjectPage({ project }) {
  return (
    <div>
      <h2>Project: {project.name}</h2>
      {/* Render project data here */}
    </div>
  );
}

export async function getStaticPaths() {
  // Fetch project names from Supabase
  const { data: projects, error } = await supabase.from('projects').select('name');

  if (error) {
    console.error('Error fetching project names:', error.message);
    return {
      paths: [],
      fallback: true, // Show 404 page if error occurs
    };
  }

  // Generate paths for each project name
  const paths = projects.map((project) => ({
    params: { name: project.name },
  }));

  return {
    paths,
    fallback: true, // Show 404 page for paths not generated at build time
  };
}

export async function getStaticProps({ params }) {
  // Fetch project data based on project name from Supabase
  const { data: project, error } = await supabase
    .from('projects')
    .select('*')
    .eq('name', params.name)
    .single();

  if (error) {
    console.error('Error fetching project:', error.message);
    return {
      props: {
        project: null,
      },
    };
  }

  return {
    props: {
      project: project || null,
    },
  };
}
