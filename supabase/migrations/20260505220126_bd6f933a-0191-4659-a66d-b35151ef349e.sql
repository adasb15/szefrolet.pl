
-- Create realizations table
CREATE TABLE public.realizations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL DEFAULT 'inne',
  image_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.realizations ENABLE ROW LEVEL SECURITY;

-- Everyone can view realizations
CREATE POLICY "Anyone can view realizations"
  ON public.realizations FOR SELECT
  USING (true);

-- Create user_roles table for admin access
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Only admins can insert/update/delete realizations
CREATE POLICY "Admins can insert realizations"
  ON public.realizations FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update realizations"
  ON public.realizations FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete realizations"
  ON public.realizations FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Users can view their own roles
CREATE POLICY "Users can view own roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Storage bucket for realization images
INSERT INTO storage.buckets (id, name, public) VALUES ('realizations', 'realizations', true);

-- Anyone can view files in the bucket
CREATE POLICY "Anyone can view realization images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'realizations');

-- Admins can upload images
CREATE POLICY "Admins can upload realization images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'realizations' AND public.has_role(auth.uid(), 'admin'));

-- Admins can delete images
CREATE POLICY "Admins can delete realization images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'realizations' AND public.has_role(auth.uid(), 'admin'));
