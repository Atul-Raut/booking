PGDMP         7                y            booking    13.3    13.3 ?    Q           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            R           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            S           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            T           1262    16386    booking    DATABASE     \   CREATE DATABASE booking WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.UTF-8';
    DROP DATABASE booking;
                postgres    false            U           0    0    DATABASE booking    ACL     1   GRANT CONNECT ON DATABASE booking TO bookingapp;
                   postgres    false    3412            �            1259    16606    M_ACCOUNT_TYPE    TABLE       CREATE TABLE public."M_ACCOUNT_TYPE" (
    "AC_TYP" integer NOT NULL,
    "NAME" character varying(200) NOT NULL,
    "DEL_FLG" integer DEFAULT 0 NOT NULL,
    "INS_DT" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "INS_BY" character varying(250) NOT NULL
);
 $   DROP TABLE public."M_ACCOUNT_TYPE";
       public         heap    postgres    false            �            1259    16415    M_CTL_CONFIG    TABLE     �  CREATE TABLE public."M_CTL_CONFIG" (
    "CTL_CD" character varying(20) NOT NULL,
    "CTL_TYP" character varying(20) NOT NULL,
    "CTL_NO" integer NOT NULL,
    "CTL_DESC" character varying(250),
    "CTL_VALUE" text NOT NULL,
    "ON_LOAD" integer NOT NULL,
    "DEL_FLG" integer NOT NULL,
    "INS_DT" timestamp without time zone NOT NULL,
    "INS_BY" character varying(250) NOT NULL,
    "UPD_DT" timestamp without time zone,
    "UPD_BY" character varying(250)
);
 "   DROP TABLE public."M_CTL_CONFIG";
       public         heap    postgres    false            �            1259    16819    M_FEEDBACK_QUESTIONS    TABLE     �  CREATE TABLE public."M_FEEDBACK_QUESTIONS" (
    "ID" character varying(50) NOT NULL,
    "QUESTION" character varying(250) NOT NULL,
    "OPTION_A" character varying(250) NOT NULL,
    "OPTION_B" character varying(250) NOT NULL,
    "OPTION_C" character varying(250) NOT NULL,
    "OPTION_D" character varying(250) NOT NULL,
    "DEL_FLG" integer DEFAULT 0,
    "INS_DT" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "INS_BY" character varying(250) NOT NULL
);
 *   DROP TABLE public."M_FEEDBACK_QUESTIONS";
       public         heap    postgres    false            �            1259    16462    M_POLICY    TABLE     `  CREATE TABLE public."M_POLICY" (
    "ID" character varying(50) NOT NULL,
    "POLICY_CODE" character varying(50) NOT NULL,
    "DEL_FLG" integer DEFAULT 0,
    "INS_DT" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "INS_BY" character varying(250) NOT NULL,
    "UPD_DT" timestamp without time zone,
    "UPD_BY" character varying(250)
);
    DROP TABLE public."M_POLICY";
       public         heap    postgres    false            �            1259    16479 
   M_SERVICES    TABLE     [  CREATE TABLE public."M_SERVICES" (
    "ID" character varying(50) NOT NULL,
    "SERVICE_NAME" character varying(250),
    "DEL_FLG" integer DEFAULT 0,
    "INS_DT" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "INS_BY" character varying(250) NOT NULL,
    "UPD_DT" timestamp without time zone,
    "UPD_BY" character varying(250)
);
     DROP TABLE public."M_SERVICES";
       public         heap    postgres    false            �            1259    16613    M_STATUS    TABLE     �   CREATE TABLE public."M_STATUS" (
    "STATUS_ID" integer NOT NULL,
    "STATUS" character varying(20) NOT NULL,
    "DEL_FLG" integer DEFAULT 0 NOT NULL
);
    DROP TABLE public."M_STATUS";
       public         heap    postgres    false            �            1259    16400    M_USER    TABLE     �  CREATE TABLE public."M_USER" (
    "USER_ID" character varying(250) NOT NULL,
    "AC_TYP" integer NOT NULL,
    "EMAIL" character varying(250) NOT NULL,
    "MOBILE" character varying(15) NOT NULL,
    "FIRST_NAME" character varying(250) NOT NULL,
    "LAST_NAME" character varying(250),
    "PASSWORD" character varying(500) NOT NULL,
    "INS_DT" timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "INS_BY" character varying(250) NOT NULL,
    "UPD_DT" timestamp without time zone,
    "UPD_BY" character varying(250),
    "DEL_FLG" integer DEFAULT 0 NOT NULL,
    "ID" text NOT NULL,
    "PIN_CODE" character varying(10),
    "ADDRESS_LINE_1" character varying(250),
    "ADDRESS_LINE_2" character varying(250)
);
    DROP TABLE public."M_USER";
       public         heap    postgres    false            �            1259    16437    M_VEHICLE_TYPE    TABLE     �  CREATE TABLE public."M_VEHICLE_TYPE" (
    "ID" character varying(50) NOT NULL,
    "TYPE" character varying(200) NOT NULL,
    "NAME" character varying(250),
    "DEL_FLG" integer DEFAULT 0,
    "INS_DT" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "INS_BY" character varying(250) NOT NULL,
    "UPD_DT" timestamp without time zone,
    "UPD_BY" character varying(250),
    "DISP_ORD" integer
);
 $   DROP TABLE public."M_VEHICLE_TYPE";
       public         heap    postgres    false            �            1259    16430    T_ACTIVITY_HIST    TABLE     Z  CREATE TABLE public."T_ACTIVITY_HIST" (
    "USER_ID" character varying(250),
    "AC_TYP" integer,
    "TYPE" character varying(200),
    "OTHER" text,
    "INS_DT" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "INS_BY" character varying(250) NOT NULL,
    "STATUS" character varying(20),
    "MAC_ADDRESS" character varying(50)
);
 %   DROP TABLE public."T_ACTIVITY_HIST";
       public         heap    postgres    false            �            1259    16423    T_LOGIN_HIST    TABLE     3  CREATE TABLE public."T_LOGIN_HIST" (
    "USER_ID" character varying(250),
    "AC_TYP" integer,
    "TYPE" character varying(200),
    "OTHER" text,
    "INS_DT" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "INS_BY" character varying(250) NOT NULL,
    "MAC_ADDRESS" character varying(50)
);
 "   DROP TABLE public."T_LOGIN_HIST";
       public         heap    postgres    false            �            1259    16470    T_POLICY_STATUS    TABLE     d  CREATE TABLE public."T_POLICY_STATUS" (
    "USER_ID" character varying(250),
    "TYPE" character varying(200),
    "POLICY_ID" character varying(50) NOT NULL,
    "INS_DT" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "INS_BY" character varying(250) NOT NULL,
    "UPD_DT" timestamp without time zone,
    "UPD_BY" character varying(250)
);
 %   DROP TABLE public."T_POLICY_STATUS";
       public         heap    postgres    false            �            1259    16548    T_POST    TABLE     �  CREATE TABLE public."T_POST" (
    "ID" character varying(50) NOT NULL,
    "USER_ID" character varying(250) NOT NULL,
    "SERVICE_ID" character varying(50) NOT NULL,
    "VEHICLE_ID" character varying(50),
    "ACTIVITY_DATE_TIME_FROM" character varying(25),
    "ACTIVITY_DATE_TIME_TO" character varying(25),
    "SOURCE" character varying(500),
    "DESTINATION" character varying(500),
    "OTHER" text,
    "STATUS" character varying(50) NOT NULL,
    "DEL_FLG" integer DEFAULT 0,
    "INS_DT" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "INS_BY" character varying(250) NOT NULL,
    "UPD_DT" timestamp without time zone,
    "UPD_BY" character varying(250)
);
    DROP TABLE public."T_POST";
       public         heap    postgres    false            �            1259    16811 
   T_POST_IMG    TABLE     n  CREATE TABLE public."T_POST_IMG" (
    "ID" character varying(50) NOT NULL,
    "POST_ID" character varying(50) NOT NULL,
    "USER_ID" character varying(250) NOT NULL,
    "IMG_URL" character varying(1500) NOT NULL,
    "DEL_FLG" integer DEFAULT 0,
    "INS_DT" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "INS_BY" character varying(250) NOT NULL
);
     DROP TABLE public."T_POST_IMG";
       public         heap    postgres    false            �            1259    16513    T_POST_REQUEST    TABLE     �  CREATE TABLE public."T_POST_REQUEST" (
    "ID" character varying(50) NOT NULL,
    "POST_ID" character varying(50) NOT NULL,
    "REQUEST_USER_ID" character varying(250) NOT NULL,
    "STATUS" character varying(50) NOT NULL,
    "DEL_FLG" integer DEFAULT 0 NOT NULL,
    "INS_DT" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "INS_BY" character varying(250) NOT NULL,
    "UPD_DT" timestamp without time zone,
    "UPD_BY" character varying(250)
);
 $   DROP TABLE public."T_POST_REQUEST";
       public         heap    postgres    false            �            1259    16788    T_USER_OTP_HIST    TABLE       CREATE TABLE public."T_USER_OTP_HIST" (
    "USER_ID" character varying(250) NOT NULL,
    "AC_TYP" integer NOT NULL,
    "OTP" character varying(6) NOT NULL,
    "INS_DT" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "INS_BY" character varying(250) NOT NULL
);
 %   DROP TABLE public."T_USER_OTP_HIST";
       public         heap    postgres    false            �            1259    16781    T_USER_PASSWORD_HIST    TABLE       CREATE TABLE public."T_USER_PASSWORD_HIST" (
    "USER_ID" character varying(250) NOT NULL,
    "AC_TYP" integer NOT NULL,
    "PASSWORD" character varying(500) NOT NULL,
    "INS_DT" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "INS_BY" character varying(250) NOT NULL
);
 *   DROP TABLE public."T_USER_PASSWORD_HIST";
       public         heap    postgres    false            �            1259    16453    T_USER_VEHICLE    TABLE     �  CREATE TABLE public."T_USER_VEHICLE" (
    "ID" character varying(50) NOT NULL,
    "VEHICLE_ID" character varying(50) NOT NULL,
    "VEHICLE_NO" character varying(20) NOT NULL,
    "USER_ID" character varying(250) NOT NULL,
    "DEL_FLG" integer DEFAULT 0,
    "INS_DT" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "INS_BY" character varying(250) NOT NULL,
    "UPD_DT" timestamp without time zone,
    "UPD_BY" character varying(250),
    "NAME" character varying(250)
);
 $   DROP TABLE public."T_USER_VEHICLE";
       public         heap    postgres    false            �            1259    16803    T_USER_VEHICLE_IMG    TABLE     ~  CREATE TABLE public."T_USER_VEHICLE_IMG" (
    "ID" character varying(50) NOT NULL,
    "USER_VEHICLE_ID" character varying(50) NOT NULL,
    "USER_ID" character varying(250) NOT NULL,
    "IMG_URL" character varying(1500) NOT NULL,
    "DEL_FLG" integer DEFAULT 0,
    "INS_DT" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "INS_BY" character varying(250) NOT NULL
);
 (   DROP TABLE public."T_USER_VEHICLE_IMG";
       public         heap    postgres    false            H          0    16606    M_ACCOUNT_TYPE 
   TABLE DATA           [   COPY public."M_ACCOUNT_TYPE" ("AC_TYP", "NAME", "DEL_FLG", "INS_DT", "INS_BY") FROM stdin;
    public          postgres    false    211   t[       >          0    16415    M_CTL_CONFIG 
   TABLE DATA           �   COPY public."M_CTL_CONFIG" ("CTL_CD", "CTL_TYP", "CTL_NO", "CTL_DESC", "CTL_VALUE", "ON_LOAD", "DEL_FLG", "INS_DT", "INS_BY", "UPD_DT", "UPD_BY") FROM stdin;
    public          postgres    false    201   �[       N          0    16819    M_FEEDBACK_QUESTIONS 
   TABLE DATA           �   COPY public."M_FEEDBACK_QUESTIONS" ("ID", "QUESTION", "OPTION_A", "OPTION_B", "OPTION_C", "OPTION_D", "DEL_FLG", "INS_DT", "INS_BY") FROM stdin;
    public          postgres    false    217   �`       C          0    16462    M_POLICY 
   TABLE DATA           l   COPY public."M_POLICY" ("ID", "POLICY_CODE", "DEL_FLG", "INS_DT", "INS_BY", "UPD_DT", "UPD_BY") FROM stdin;
    public          postgres    false    206   a       E          0    16479 
   M_SERVICES 
   TABLE DATA           o   COPY public."M_SERVICES" ("ID", "SERVICE_NAME", "DEL_FLG", "INS_DT", "INS_BY", "UPD_DT", "UPD_BY") FROM stdin;
    public          postgres    false    208   ca       I          0    16613    M_STATUS 
   TABLE DATA           F   COPY public."M_STATUS" ("STATUS_ID", "STATUS", "DEL_FLG") FROM stdin;
    public          postgres    false    212   �a       =          0    16400    M_USER 
   TABLE DATA           �   COPY public."M_USER" ("USER_ID", "AC_TYP", "EMAIL", "MOBILE", "FIRST_NAME", "LAST_NAME", "PASSWORD", "INS_DT", "INS_BY", "UPD_DT", "UPD_BY", "DEL_FLG", "ID", "PIN_CODE", "ADDRESS_LINE_1", "ADDRESS_LINE_2") FROM stdin;
    public          postgres    false    200   b       A          0    16437    M_VEHICLE_TYPE 
   TABLE DATA              COPY public."M_VEHICLE_TYPE" ("ID", "TYPE", "NAME", "DEL_FLG", "INS_DT", "INS_BY", "UPD_DT", "UPD_BY", "DISP_ORD") FROM stdin;
    public          postgres    false    204   +e       @          0    16430    T_ACTIVITY_HIST 
   TABLE DATA           ~   COPY public."T_ACTIVITY_HIST" ("USER_ID", "AC_TYP", "TYPE", "OTHER", "INS_DT", "INS_BY", "STATUS", "MAC_ADDRESS") FROM stdin;
    public          postgres    false    203   �e       ?          0    16423    T_LOGIN_HIST 
   TABLE DATA           q   COPY public."T_LOGIN_HIST" ("USER_ID", "AC_TYP", "TYPE", "OTHER", "INS_DT", "INS_BY", "MAC_ADDRESS") FROM stdin;
    public          postgres    false    202   ��       D          0    16470    T_POLICY_STATUS 
   TABLE DATA           s   COPY public."T_POLICY_STATUS" ("USER_ID", "TYPE", "POLICY_ID", "INS_DT", "INS_BY", "UPD_DT", "UPD_BY") FROM stdin;
    public          postgres    false    207   Ӓ       G          0    16548    T_POST 
   TABLE DATA           �   COPY public."T_POST" ("ID", "USER_ID", "SERVICE_ID", "VEHICLE_ID", "ACTIVITY_DATE_TIME_FROM", "ACTIVITY_DATE_TIME_TO", "SOURCE", "DESTINATION", "OTHER", "STATUS", "DEL_FLG", "INS_DT", "INS_BY", "UPD_DT", "UPD_BY") FROM stdin;
    public          postgres    false    210   ��       M          0    16811 
   T_POST_IMG 
   TABLE DATA           l   COPY public."T_POST_IMG" ("ID", "POST_ID", "USER_ID", "IMG_URL", "DEL_FLG", "INS_DT", "INS_BY") FROM stdin;
    public          postgres    false    216   �       F          0    16513    T_POST_REQUEST 
   TABLE DATA           �   COPY public."T_POST_REQUEST" ("ID", "POST_ID", "REQUEST_USER_ID", "STATUS", "DEL_FLG", "INS_DT", "INS_BY", "UPD_DT", "UPD_BY") FROM stdin;
    public          postgres    false    209   7�       K          0    16788    T_USER_OTP_HIST 
   TABLE DATA           [   COPY public."T_USER_OTP_HIST" ("USER_ID", "AC_TYP", "OTP", "INS_DT", "INS_BY") FROM stdin;
    public          postgres    false    214   �       J          0    16781    T_USER_PASSWORD_HIST 
   TABLE DATA           e   COPY public."T_USER_PASSWORD_HIST" ("USER_ID", "AC_TYP", "PASSWORD", "INS_DT", "INS_BY") FROM stdin;
    public          postgres    false    213   ��       B          0    16453    T_USER_VEHICLE 
   TABLE DATA           �   COPY public."T_USER_VEHICLE" ("ID", "VEHICLE_ID", "VEHICLE_NO", "USER_ID", "DEL_FLG", "INS_DT", "INS_BY", "UPD_DT", "UPD_BY", "NAME") FROM stdin;
    public          postgres    false    205   ��       L          0    16803    T_USER_VEHICLE_IMG 
   TABLE DATA           |   COPY public."T_USER_VEHICLE_IMG" ("ID", "USER_VEHICLE_ID", "USER_ID", "IMG_URL", "DEL_FLG", "INS_DT", "INS_BY") FROM stdin;
    public          postgres    false    215   ��       �           2606    16422    M_CTL_CONFIG CONTROL_CONFIG_PK 
   CONSTRAINT     {   ALTER TABLE ONLY public."M_CTL_CONFIG"
    ADD CONSTRAINT "CONTROL_CONFIG_PK" PRIMARY KEY ("CTL_CD", "CTL_TYP", "CTL_NO");
 L   ALTER TABLE ONLY public."M_CTL_CONFIG" DROP CONSTRAINT "CONTROL_CONFIG_PK";
       public            postgres    false    201    201    201            �           2606    16522    M_SERVICES ID 
   CONSTRAINT     L   ALTER TABLE ONLY public."M_SERVICES"
    ADD CONSTRAINT "ID" UNIQUE ("ID");
 ;   ALTER TABLE ONLY public."M_SERVICES" DROP CONSTRAINT "ID";
       public            postgres    false    208            �           2606    16478    T_USER_VEHICLE UserVehiclePK 
   CONSTRAINT     s   ALTER TABLE ONLY public."T_USER_VEHICLE"
    ADD CONSTRAINT "UserVehiclePK" PRIMARY KEY ("USER_ID", "VEHICLE_NO");
 J   ALTER TABLE ONLY public."T_USER_VEHICLE" DROP CONSTRAINT "UserVehiclePK";
       public            postgres    false    205    205            �           2606    16612    M_ACCOUNT_TYPE acTypePK 
   CONSTRAINT     r   ALTER TABLE ONLY public."M_ACCOUNT_TYPE"
    ADD CONSTRAINT "acTypePK" PRIMARY KEY ("AC_TYP", "NAME", "DEL_FLG");
 E   ALTER TABLE ONLY public."M_ACCOUNT_TYPE" DROP CONSTRAINT "acTypePK";
       public            postgres    false    211    211    211            �           2606    16796    M_ACCOUNT_TYPE acTyppeUK 
   CONSTRAINT     [   ALTER TABLE ONLY public."M_ACCOUNT_TYPE"
    ADD CONSTRAINT "acTyppeUK" UNIQUE ("AC_TYP");
 F   ALTER TABLE ONLY public."M_ACCOUNT_TYPE" DROP CONSTRAINT "acTyppeUK";
       public            postgres    false    211            �           2606    16530    M_VEHICLE_TYPE id 
   CONSTRAINT     N   ALTER TABLE ONLY public."M_VEHICLE_TYPE"
    ADD CONSTRAINT id UNIQUE ("ID");
 =   ALTER TABLE ONLY public."M_VEHICLE_TYPE" DROP CONSTRAINT id;
       public            postgres    false    204            �           2606    16618    M_STATUS mstatuspk 
   CONSTRAINT     p   ALTER TABLE ONLY public."M_STATUS"
    ADD CONSTRAINT mstatuspk PRIMARY KEY ("STATUS_ID", "STATUS", "DEL_FLG");
 >   ALTER TABLE ONLY public."M_STATUS" DROP CONSTRAINT mstatuspk;
       public            postgres    false    212    212    212            �           2606    16597    T_POST postId_uk 
   CONSTRAINT     O   ALTER TABLE ONLY public."T_POST"
    ADD CONSTRAINT "postId_uk" UNIQUE ("ID");
 >   ALTER TABLE ONLY public."T_POST" DROP CONSTRAINT "postId_uk";
       public            postgres    false    210            �           2606    16605    T_POST_REQUEST postRequestPK 
   CONSTRAINT     �   ALTER TABLE ONLY public."T_POST_REQUEST"
    ADD CONSTRAINT "postRequestPK" PRIMARY KEY ("POST_ID", "REQUEST_USER_ID", "STATUS", "DEL_FLG");
 J   ALTER TABLE ONLY public."T_POST_REQUEST" DROP CONSTRAINT "postRequestPK";
       public            postgres    false    209    209    209    209            �           2606    16828    M_USER users_user_id 
   CONSTRAINT     e   ALTER TABLE ONLY public."M_USER"
    ADD CONSTRAINT users_user_id PRIMARY KEY ("USER_ID", "AC_TYP");
 @   ALTER TABLE ONLY public."M_USER" DROP CONSTRAINT users_user_id;
       public            postgres    false    200    200            �           1259    16562    fki_ServiceId    INDEX     L   CREATE INDEX "fki_ServiceId" ON public."T_POST" USING btree ("SERVICE_ID");
 #   DROP INDEX public."fki_ServiceId";
       public            postgres    false    210            �           1259    16573    fki_VehicleType    INDEX     N   CREATE INDEX "fki_VehicleType" ON public."T_POST" USING btree ("VEHICLE_ID");
 %   DROP INDEX public."fki_VehicleType";
       public            postgres    false    210            �           1259    16802    fki_museracTypeFK    INDEX     L   CREATE INDEX "fki_museracTypeFK" ON public."M_USER" USING btree ("AC_TYP");
 '   DROP INDEX public."fki_museracTypeFK";
       public            postgres    false    200            �           1259    16603    fki_postId_request    INDEX     V   CREATE INDEX "fki_postId_request" ON public."T_POST_REQUEST" USING btree ("POST_ID");
 (   DROP INDEX public."fki_postId_request";
       public            postgres    false    209            �           1259    16584 
   fki_userId    INDEX     F   CREATE INDEX "fki_userId" ON public."T_POST" USING btree ("USER_ID");
     DROP INDEX public."fki_userId";
       public            postgres    false    210            �           1259    16595    fki_userId_post_request    INDEX     c   CREATE INDEX "fki_userId_post_request" ON public."T_POST_REQUEST" USING btree ("REQUEST_USER_ID");
 -   DROP INDEX public."fki_userId_post_request";
       public            postgres    false    209            �           1259    16624    fki_userVehicleTypeIdfk    INDEX     ^   CREATE INDEX "fki_userVehicleTypeIdfk" ON public."T_USER_VEHICLE" USING btree ("VEHICLE_ID");
 -   DROP INDEX public."fki_userVehicleTypeIdfk";
       public            postgres    false    205            �           2606    16563    T_POST ServiceId    FK CONSTRAINT     �   ALTER TABLE ONLY public."T_POST"
    ADD CONSTRAINT "ServiceId" FOREIGN KEY ("SERVICE_ID") REFERENCES public."M_SERVICES"("ID") NOT VALID;
 >   ALTER TABLE ONLY public."T_POST" DROP CONSTRAINT "ServiceId";
       public          postgres    false    208    3238    210            �           2606    16574    T_POST VehicleType    FK CONSTRAINT     �   ALTER TABLE ONLY public."T_POST"
    ADD CONSTRAINT "VehicleType" FOREIGN KEY ("VEHICLE_ID") REFERENCES public."M_VEHICLE_TYPE"("ID") NOT VALID;
 @   ALTER TABLE ONLY public."T_POST" DROP CONSTRAINT "VehicleType";
       public          postgres    false    204    210    3233            �           2606    16797    M_USER museracTypeFK    FK CONSTRAINT     �   ALTER TABLE ONLY public."M_USER"
    ADD CONSTRAINT "museracTypeFK" FOREIGN KEY ("AC_TYP") REFERENCES public."M_ACCOUNT_TYPE"("AC_TYP") NOT VALID;
 B   ALTER TABLE ONLY public."M_USER" DROP CONSTRAINT "museracTypeFK";
       public          postgres    false    200    211    3251            �           2606    16598    T_POST_REQUEST postId_request    FK CONSTRAINT     �   ALTER TABLE ONLY public."T_POST_REQUEST"
    ADD CONSTRAINT "postId_request" FOREIGN KEY ("POST_ID") REFERENCES public."T_POST"("ID") NOT VALID;
 K   ALTER TABLE ONLY public."T_POST_REQUEST" DROP CONSTRAINT "postId_request";
       public          postgres    false    210    209    3247            �           2606    16619 "   T_USER_VEHICLE userVehicleTypeIdfk    FK CONSTRAINT     �   ALTER TABLE ONLY public."T_USER_VEHICLE"
    ADD CONSTRAINT "userVehicleTypeIdfk" FOREIGN KEY ("VEHICLE_ID") REFERENCES public."M_VEHICLE_TYPE"("ID") NOT VALID;
 P   ALTER TABLE ONLY public."T_USER_VEHICLE" DROP CONSTRAINT "userVehicleTypeIdfk";
       public          postgres    false    204    3233    205            H   z   x�m˫�0 P}���6�����#�p8VQ�-)��G�֟�	��|F&�^��Cb6�!� ��yQӲ��'%&r�6Ip�}���k�h��a�{�Gy��V��,���щu-��R���(�      >   �  x��XmO�L���b�gi�ӷoqc�H,���ӧ�ڤPvZܘ��}��ڙ���&Obv�;羝;_�^�ä3���Gw�q~�;7"͢9D�@��OI,:�_`w(����u%��X.��;�����c'_7д	:��j�"
-`��0��85��Eh��.���\DE�-4�mu[�!�Kк�
���Fx���P��Û��`x7�6�����Q��h��E����\�LVj�nНEi2Wˋh	��|F`�7�@��J�����*���=�nW&� �xr��t>������|�<�d�-����xL�\G�(.���x>���L���l����Z��7��H�%;�ۗ�w�0��gQ���c���\�Gg���ͷ�R���A7���� [/K���Zñ�������d��xx�ך��N@��PA�Gע�2{����ZL�����,̱��Aա�v�3��J@Nz�Rfr0W8��ઇ1�M|��-;{^�y���%'uLk��K�Uވ���[�0�L�dk�MW�]"����u~\��%KS�_(75G!��<���*΍xH�B�/hLgI�=���D�E����Fb%��t�����l���W&>��S?��4���q���unj���f^�6>���;���l��z�U�t�sWX�/���)ww��t6Iտg�ΆT3CW�B����X��Q�R�v��U|l�8���j=��`b����Gg�I�T�׊�Op��C�0f(�_��σ2�8�.gJ\j�^�tΌv6��9��Tʫj�K�s�ݞ2se��]��T���HƏH��I�B߂(��2ϯ���j�iB���繶��;�:a+D�_zk`]AU�ND=VMխ���֣�=c�tnp�C��aC�еM�m���̞�9��9�'�ܹ���ku����j'C�����.�k��?��~��,3cy�fF���;����b[�p�6MXz��ד��u�0�JaV���mZ�x�	L!դ	>Ax��c���UW0@� �=�y}%gs�>J���+�̬<>��v����u��Y�zo��ť���&�6�z����=�� 6�5
2���5V䏮5�ⅆ�.4<�%��ʝz�<F� n[��8���7�	Y�b�%r�Jr{��j�W�>�����avEӕ���yU.[�M<��k�mH�9���R�e1n����ۚ�P�P�m[���\��X���6֢�~t�43�ѭ�m��~X''' �f_�      N      x������ � �      C   =   x�3����t�4�4�4202�50�5�P0��25�2�Գ0�47��t	���"�=... <      E   k   x�3�)J�+.�/*QN-*�LN�4�4202�50�5�P04�20�2��3�4201�t	���".#N����"��b$�Ɔ
��V�V�zF�f&@�%�9P�1z\\\ ���      I      x�3��s�4�2�tq�qq2c���� 8�?      =     x���݊$7��k��_@�$K�UW�XB~��B�]6,�dCf���"�3� ����4]]������Ϗ�_���p�e<�����S��8�_������/���Oc��=V�|���	� �چy����巟�������pɻe-0YD:��ހ�O��;\�������]<v!�D��kJ9����{���zC��|�	���P�e�3 �����W�D�PeCY�f�W �\S����%\s�_}���=�Ia��@�9x�F�ɉq�Y�0��=�ӟ�cퟞ����U���C<��S<��{S��m��ޅK����V���P���j
I,�*����Z��ȅp;H�Z�[�ٸwi�@�&�B�ݥ�n^ڕ�ڿh#�(�	1'�%PǮG��0H)�;*�\w%����7M����&�����Ի#�YB���V��4E�]o����aT�����#Ƹ�]��
Z.�6��x�H�rmU��O��p ��j#"��LÇ�|��w%<]0ls����U����y��)C�F�)����Y��ɇ$mc�ә�)�rS�3D�nҎ)�4q��٥{y��Q}ie���	�������^
�@���$۹�J���t��VI'3��6��	S'p��V����%=��߁S�dkIG���콋�=�]ƌ���<mG���H8���;y��l�-�NxRCQ���a��
.ܡ�͓� :������5
�����8z�͙@[�b��T��v�c���q<$Y�R=Ӈ|�c`��b
��a�V*����Ň����ovY.      A   u   x�]�;
1 �z�s�M�O>�.�"��)\l���T��_A^��n���'����6�nw`PVq��	I,l%�O)�P�W���!(~�����?h&�KE�Of�u>}��#�
V      @      x��}�o,7����+��F?tt�l{�q����YOm+K^I���b���`VIUY�Lf�JU��|����1H����/w����3�W��_�n/���ۧ�ǫ�ۇ�����W�:�d�'�.�]]"d���_���w�l���O��'+__]�x�����.��������7��_�������@��{�8�����������E��@R�����s���6ؐ֘\�L�������뻛��/m��dt���d]aYt�?
����wOϻ`��d(X�8߭K��s����5`�Cz��?˯�p�%�R��k���)�n�n�	��D� �5���m ����/7��x�	.�WJ�4��.���]������>������<>><�����꧛o.���ս�����?\��~Μw���ۻ��x��"��������>�~�`1��?��.}�Z)n���)ϧ�׫��<<Χ��q���(��'u��B�g=���Bϗ�Ϧ?T���[��r�� �%DC	ӌ+l����@��ۯ��WB�	1@��n��>v&GT���å��އӧ�p�R�����y�8x�=�N?�����M�*�����09�k�+怐�Ez��#ꓳ&x`�[����(�zv%��ܸdl�>�0�������_���͵J�<�����/�7=�×`UJ� �R�2�I��F�Q;8�K�M�]�U7���j�v6����]�2}�#��w绻G}�j��D�U�1���uY�3^+�%?�}���Q�R$�#���Gr�/��es�y�8��>��?�T����vq�p�����so(1qP.!B<�PNg��]re5��Ｈ���OX㣬ܢ����9�0���(1(\���{�����uK���N�tLd�� ֭��:�w������ �"��p���K&�CE��%��,yC6�4 �5N��)��r���] {�#&��J4��xcU�#Ƙ(h�O���pU�S ��rD4)���^ODG�d�8�(��BvǤ�f$6�z�ê"Q�Y"�Y�B8�~�F;��C90��-��v���'�C�E&�. (��	�� 1��j?|0hd�A�J���'�A�� Lٞ��لUkX�L����4`R���Y�5�b9��z
�R@���@J�K.�� ��||�7�	�������E��#��P9���Q)l1&�
Tn���v{�8���#���7k�H� d��@CY�� ���#%�ɧ�h�֢�� #cU�݈r����n����vͩV��E�X4�j��TX�|�6c�os�D`�¥�x��K��B��07��bp~��	ы"^ �<�C��=-d����l������ʹ�TX�*��l��e�B�f�q{&�AtP�^F_�Fj!�u�ns2��'��㼋�F����.�+;���*	����]��"�]0��ʔ��t�.�I��6��O����Ro���(��,ӉM@����SVW��������l+��vu�ͱjϓK��Q)��q����"a�q��>iu@wr��t>�eݞ�iI��Ax�X�x)�$��.����So#�'����O�F������W����j�p7���{����G�~_�g8�d1���oW׿�pw{�{�0vQ����}���%�V�4>��߆�i:j>}0�O�S��'�!d�pO��AL�H.��>�[8�K	��w�pC�z����'z�y�����x���I^�+ɬm_¬j��qe	,Ұ�݋>8P�|u����w+%��o?jV���51kȞ�r3wA��+�I� v���N�T��
�瘂-U�m������=���~�&�7�Vx�>T��zC1�Π�)��i.*5|���DZM�a�pJ0�Y�A�x;�u���oOgQ�f�/TFull`���'5��2oR�Ei���6��-"0�\�L�7`	r&�h���ńg.����|��M�W3�y�jxbbԼ���>=�r�|���?n���������B����o�v)�7CЍl$TɌ����"�SN�Jȱ��{�@1��d3�a��\|����^l���X���H֖J��/$8�G�B�ޏ� m :ͣ���ya��M@Q��E�RA^�R�hB�1���X?�`�X�P����"v�ps�C6FB'\�krj&C���0>V���k��	�r��-�;�y�F{=@�T���y���j��Y�*�R@��0��K��.�]M�`��� ]���<\��6JH^��7/�H��Ƭ�:ΉY����eR�@�cTJ,z�r&-,-J�e4C�5'���K��}��v�$��Ն�rb�¶=�'��V�5>x�p��PS�ɃC:�`�g�0bpo0���W)����n��/Qd�6��!��M૊�'�@/��:pr�m�9�zIR�<	T�$Cc��Y�/���\������FU���QJ��E	Q<�.c[�ť�TqݪX�t��Ầ��� g�a���%��h�"��.��>v3�k�+����ߎ�bn�Z�]:2%A��/^�����������{�]�|a�x��N�����#.�
�3=���3Q,��c\7�oo��\^lX��B��/����}~����cg�t	a�
(FQ[-����[�pШZ�X ���������2a��>�
�\���]��5�M�çh`�����O2�����_��)�T�@�T�l�e�qB&��W�區�����28o2���c-'=<�Z$�g��1���ge*�����	�0��F<�j҂Z���2�vXo;2�ɺm�O�����(9�M�'cln�ԝ`AU�W��zW�{
,��ǿ��-_y�(�;�V��\faȅ�^�̎��c'�b'r*Jr&�x��ȍ؂����݉�ä�	�Uݏ�x��ph�6�s;qԝ��K	i#��c#��A��;q%}����.߁m�G�	�ڱx��N��N���҇awܝ ֨7�������l�[lGҔ?��������x�� 2��WԱwB�n� <��؉7�	m���Hd�UXl����-�m%sJ�#Yb+Y��1�E`yLb�W��fA��VM���s:�<1�c�Y7��Uc[�FUM��5?V���Il'��~�d�J���ϳ��̽���Zɐ{y�M�>V�u%5CӔ�D��J�W���c��l�����B���QU,���繓v谞�L��;w��.�r��^��x�����w�ISt,D��侻��ےhC���y�z�h����<8M��#�ϓvm@��|�sg-��y�%�����v40�N��a��b�'wfw]��Om�$�|83[&׷:0����w;w�Zd#�s�ic��C����)6����:w�`��3e��VX�a87�E.��ia�]���C� ���g'�?�䘇����k�@4.:����\U&��O��T��}	��c��]x��w2w�&Qv���/�=7�M�	D�$2�tf�][�hk�D�әYqy�b�'���N�Nڈ��P��w?wr�|83}^�����7����	L���u�r�o4�П��6��̵"��o�䵗�c�j�y�1���s��乣5��z{�s�.���~O�s�;h�U��̂2}N�� 2�YB�j��a<�ă��E��h[�w<w��[�KC�����1��Ωx|'s׼SLg&ⴻdN4"ɟݾ;��^�|7u�& ��ߚ��SK1��O�}�d����,.���(9;��穌K�t�������gx�&}�
�-�W�GoҠ�\����<hJ�A�%m���&z�#���繻���S:����Yg���,�׽]��@p4�!�{����w�6�L��p6g���Yɸ�܉ML�F{�U�}���wg:j(?]�x�K���|"���h�g�Ǟ�y�i2�'��L�4���B��∓ ,]m��BQ����3W{8����^��rf�b�c��� }T'hcNYa˸�u�x��4-Xir��P��F �k��6DQ5W��    �At�0��ڊ�Na�e�i��'+�b��׌�����ֈT�$=]5���fp]}&|UK�9��-�u�-����,��]��ꁴ�!jz�M��(�u�tܖ���OY�1�ѭC$#�2ݟ�C�����PC���Xr�p�[��#��M������M�6BfYw�9�����Í���Y<�yCa�����i�&��)� �lF��Org3���k9�������hն��y����reP.3`
�8��!r�S��4D� ^�w� _�@Tk}��p��zmXp�p�!|���Y���:!AI0,W]eVECD�ґnA�t}��>��j��(�������������!?��],����O��_���%K�q Q��,pq��f��]���@� hg���H���eJ��e���Xli������5=MDbW����s��f��4�(w��0���ۛ��WT��z���3ӎ�Qks���e$�-a1���U�܄�yBa��[���K ��t?4�\Z��F_ZP���w�^�j������ E��~��M�����܅NN��ê�%�%��u����6��B<�r'�씳�*�
��O0�17���O���G��T�'�D/,��6���+z�����ʝ�<b�
���L�b��4������p�I(e�F_�<�ۉs�Z
HqX>B�*r;Y1��)�W��GEuQlO�М?�D��V�
��<��8��?BI�(�8�=B9�(!�#���!4h�$�,B-�{��YB�PЂ�5!�,�7"D�&� ڏ��zKB��W�#ɟS��7�\��y���8<�{Cr0���f���G)XK)SB�ƽ|���ܵ�`����4���
�	�H�2G����Z���=Y���i���4��'g���5�;-��W{�iI��V��<�����=��;M)��Z�OOީ��u>㓯��;)���X��,���;��M;�3ս�.�s����Br0�.�{+�'� ��c5�oFH�LT� <R y*�F����(�ۃ�ZI�<Q��q��S~8��td�CQ��x�ÛBV�X8:!�Rͅ�j�����[��DzQ�R�����#� �K˚�B�,����K;dKSM�}bN�&fkkb�5�Q�.�f���u�RO+Z��K-"�P�Ԟ�(�$8#���{I.�}!j ΈQ��Y��|?�c!b��6b�v��6D�U�ϗ����z��ɘZS)��h��&�B�9�g'�	z���]L�FFDu�r(-����7?�>=?f=��=�g��b7��5PT%壘<�gI�З;5�b��II�#ҧ͐���� P��>Q�D&�r����&J����� �A�n$3����aE���9[�G��M_�y�t����Ɉb��L���뚹�\1��x�y�B�L���s<���^9��;Q��E�y�����ui�����r���4�꞉��/|?�r� %��$��r'/�Hi����]�����&u�X�p�׋���IΝ���n�hP�{'�pR�9&x�����r��h�����?ȯ�G!�����6�w��~�f�0R|~l�e��	ǣ��zȞ$����D| ���>��t��H��ӧ��p�i�_n�΃���#�G9W�k�V���x��6����M�N�>ε�.�u4k���]PL&FيRh�(Gb���@>�_�.X+�Bn���q��
���Jq�
 �l`��t�@t���]%C(F�+���r��S�('�����5�Q)<^��Q��{�l �/^ �C����dLܸk��aH����
 У�ʱH(
)Z۶�����)�ۯ���H���ERvm��K���ZڀHK�|r��!�а��mk�9>������E�ɒO-�Q�莘���V >��/����I��|E���ܐ�ߓb6P���!��r�R�8���u�����.mfm�m�]�v�k"�r1Ǿk6k7XtM��{�6�V����@Z�i�Sj]l��b�S���\ I8�l�-���?S¶�h������� L���@,:�~;��@ة��ԸD�*d����!�O����_~����N��de9���pzv��ȓ��j�e8y��U�\vB�<1҅��=r�	�����)v�r�xs������/L=h�
��m����Jd��>&��MHE��h0-�k	9]�n�k�ɓ{"X[�e;y9��S9�h��>$�]_c,
�i$U]�W��^���<�T��25�I�^n�	�
	E�G��ZPRn��/�H��蛑H��NMx�*�X-3�!�5�
$-���g#A�yW��G��">wrD� q�7�l*���5w}{D�b2�R����ĺ"��k�� ڏ5�Ԛ1԰ߜ|k��uH�v���E��)�~����F��cn	,���q��h6�Z�O �J�>q�Oe�x�]�j V�*��bO��j�-����� n�H;�HԶ�*��	�����v>	r�-�����Mbi����78p����
��!�1f%�t�q*��*�F�d������	5�
��)2Qhʙ"����Q�\M�@��I�@]?D�T^�i���GL�5�ش.D��Jȷ9UuS�tAB�>&�,�]���l�c���W<�W\v�U!����))W�Cl]���=JhK��i�F3�re�9[�p+�r���Z��SH�[0��{h�	2�6�qR�hU!�E`�/�k��I�j[���&�4#��b�ة�T�`� e�-��e���:�wG\?=��mzq��g��Ϳ�dj�s
I��LϲsMH)w������d���e�\L�$Ag���HZ.�T��ȷ\sZ��&�vz���U qW�c�/�!�6^H�[g�k�R�D�Dq���P��-B�����P��+���+��b��-������a*G8+�HCJ 4�����K�ɹ�Uq �r�5"q����$���@�9��`�rPqI�Qx"RMA�.lNwt�%\~V:�,�e늒�Is��`TQވ�����rZ��C~V�N�@�y>נ���H����LH��LΙ��|za�ܘ�,���e��7p4���D�d��1:���f���}�E����4��A�~��wT���H2d�{&
�\ףk�J�9�8z,9��B"U-�Rߥ5ɦb6R~p��K7Fn �R���fR��r��e��i����u���`>R�,�w�"��Nǎc�?�l$���\BW�z �f5?��|{}w3�����i��_�o�/��?_\�|{��r�*�6܆;�����:5g���{ۻLBo�^SAD-���u/�=+�_{��*�k~j/T�!��E���x-r���>��"�ا�T���ֿ�+.���}��O��R�ߺ	���vs�@N+Cw���Ó5iu�%�g��uf�6?ldE��8��OX��J�%'��8a��mg�����˳ȣ�{!���uM�ɩ�k*���F���ֳ\>�U��,����䊜�d�I\�6u+հd��ob�e��<�r
Tg6��s����J$mK����D�ά�j��ڹm��$}r, ���+�H����β�RN�`���N@r�&?�ǯ�ջ�0�?���ղ	�\�P��T��ߵ{>RT�Pr�o�2Ic��=����G�Y�O��H�J�QC�]����9LV �{T��P�gH�^�$�!FW	,r~ɡ+��T �#m�ِ�׹0Zm�%B�H���\�Ķ�&uyy�����j�h�&��S�I���R,����rPD�6�"�UF��Eߺ������H;$�krYة��Ԓl�%*{�E�w-�7�{gm�+��^~��5��nZ����(�^t|���io#����Gx����0EQXYj$��V_������G����*�xl�)�r��~w��n��<�	Z��E�L�wz��]��##a�d�WL��q�2������p���H!�a��>C�ϠbF ���ɋ9�!٩��*�ҔN����o�.M�daX��^����!Q���r��[��{Ķ)j�
�I������ D� �   %�f�#�App�l+f�u�3BMyF��w��(t�%-@d�/���?��ݴ��j~^w���oE�L�H��B'ǂ/�2&��H�	<�ؽ�����)���ƧuVNƁ�#�1b��λ>�{)eO��˽�buR��*�U�B3�K�r��:;����~Գ��������"��Y�Ī�R����,p�7bu�������-�UL3�^ "�|Wκ��<��>�s������E�Ѫ�	]�h�omr��h�I�`Ŵw���VEX�srAB`h%��u>A��$�^��m�t~T��C9����Q+<Ţv��>Luk�s���ok�=�� ���MLTQ��(4�0I�3#��"�)�)����a�jv)Lc[�s1,�e���*F�w�X�G,1�0��UM)rY���}-� ��b*h�5���x���lZ��H�b��u���4xk��+�I��,"�#�C_�6����� uHr7��#qtTҨ둼���#X����+�))M�T�P�$6e�)�a��]��P�۩D��$zV������yQ�E�#���А�!�rk-jjH��b��3�<pI{>�&�����
Is����EU��d���n�U%��#k$M��.�-Q3�Á�ʭ�BҤN�P��F�Vѩr�;��a[2��H"�I�u�N󊢉ɵktH��>�R��o�믿�/��      ?   C
  x����n%�����X�$�@ �	���M�l�
f�?�*�r�T�j���J��!%������}��z����}����+�K�/<���U�P%��������T}����_���_~�����R���7�>�\\�����Bl�^�#Zڃ��2��S�P�J��/�����
7r���5V/޽7�)�[�ļub��=Ċ�����}�c۴T�6>����T~&=����_�����Q�4�-��^���hm�Ձơա���/$�D��f����'i�!=��M�6I��;�{qx۰a�Z�Lwa�S+�T�.,�q�N��_-M�ywe{ఱa��ɷa,�Rt0���|�G�G��0�Ѥ<�J�f�͆-`��Z���g����#�j�"��a��m���'��U�lmôFx*غT6w��0��0C�!�������!-��"��G��ͬ��]ٌȮ$��&<ڣT7e���f������I�����	cp1ő��_��#�e4�����5��qbV�S��`͖V3ߦQ�yP���ك���M��@g":�n����!�f�"V�����b�I�g��` }(q�Z͜�d��@w:����xC��r��:���3���@���f�^�0�i$Է4���@�+zX����hS+mX͇xL�T�MƦ���m�i3F�׍3���E����x�ZJv������Ʉ� �KM����kZB�c6~�\�����g��!�jz()������:!o���VM����^(� �o`�6�i~�Χ5��ñ0gi�&��\9}cP�:�~VC�kw��x�%#Q���8 �f��A�'�l^l��!�QN�Zog=x�B�a!j��9Q�!��Ҙ��<�� u>w���}��y��YB��]T�9�G�t"��%�T���Hc���tѹdQ 6��ͮ��T�W?g�=D�Y�8��Z}l엚��̣��i#~[As�g�۩�������颪&z�p��"���&9)>��Fu��As,��wj<��:��=cQ�Zo~��ca���'���73���-���}v!�q^�}�s}τ���0g}V08SFmt�2]���B{� �:c;E��1�#��i��bF�󠓦.��_#H�Գ(�ƁJ���7�%v�י�ڰ�m�i��'WǃAr���&��h��[���h	��5%��h�-�)�d��,DT�٥O�+@�@��,F��(��.s��!�W;�?i	)a�Tlc�+D�e��Tр�!��)���	%�Γ����3rOB�=��IQ'Q���iB(y��^:�%!N�銬�'�_��2j�{
!v�l�P!t�dc$�	����v�����Q^�V���Zq�&��4-$uI�G�2�2��Ґ�AQ*C��J?�aⵢ�gH���+�W�H���qţ`�)�d�q8����L3�EW�/w<k��8&M܀z�<,(ɀ8��:_M�����g[��Ƽ~A�8��-����F���|%�~����"q�FD����Y�vd��ȢAϺv@�� �Ї�ω"5��yzǡ)5�H͡{)��1�C�c�������\��|7��b�KE�q*���Eo���h�y#4gc��y��W��Z��H.e��c���
�W�!��.���I����K����q��8m�_Wo�t4VG�ڧ�2�N���]�-p	�4EsL�b�l�4b���8߃�B���4'�4�U�U��x����B��A�����o�P�9�1�2�����J�B�S+�B�4��sbu@�� �qI������xv�>v	�71�����`��4o���]B� 	�A��r*r@-��!����O�%/7�= �J�q��_A�:��pm|ޘ��&�r_y#\X��hy��9՞���42�6�r�z�_�<��ZA&(,�ebu�ja�xc�h��Z=W*'.^��.p�?�\!��))�$��0�x�y	w��Wy"\5��4g�Ma!�G��b��_� �u#�£�3e���j�y��8���Z��PT�l͠סA�s=���K�{
$��4�y�3��7>�#ީ�Սx�GAѢ�����t��2N��È#��]�}���y�	���2�]0W��t�NhN@G͙��� I����sd3B�v T���Mk2O,�<��$�(�\�؂$r�¹���wU��󃍛y���J��q�$P��U;�!��R>^u���:.o�ИS���|Y��@^��s�g��1B��gS��2�bL�C�����GTk�y`*�7�(^���i}�p`q�5���I��Q�̠܀�����8%�ƫ�m��:��oP\m�t�ly}��z�3\0c�Nn��y��*�<�[�4�t�k�*Ą��EOӡ�JMDEN���CUZ�l�t?��V=��㶻��y:�ϡ�*{?��K�j������>�8y7�cµ��u�5;F?��w2�,.��F��[���泊��=�9 ���mG'�ݯ��o̽�y�b��$_m��۠_p����;&?��zy���qJ�w~���<A����1b|��<\�����j�v"+��	A��F~3'�X1��C��70�&�[�����zs]�      D   �   x����n�@E��W��h^��t�q!���!.�����ٚ5(�m�9wr�0nw�Ƒcd
���!�&`N��߼�O�y�����Y�M����v%|#I����ﯰ��F@���S��&$�dz-�5��g�yC��3��Z�O�i]�����?L=�a��kK��y��Q4֨M���J)�;@�ux�jV      G   i  x����N1���)x�Y͌g���{�C�.��H�}PE�"���$Z9���ew��R`���z��0;��Ԑ%N����|���DO�L8����׳���|�<�N�\L�3`�����ma�)��N�pv��ɗ'ıy��%��@�T@�a`t������qn��V*�	5�)�Qn)jw���k�X�����Yռ�C�+��P��{aaȾ;0�ŚD�W��ϛ{��4%�[�H>Ք��*H�I�)6b��dh\����4.�IQ���r�C�1j����Ը}Tsz��}ww���m�_$�L����
��]
 �D�
-&�jf�}OdQ��r�U9���:p룧|����Zɏ����ʋ�Т8�
�y��}�撁�`��	�c?9vzͣ����)�x��HXǅ+y$�r4�Ϩ�FR|�w�p�����q�0#��ZU&߲@�<�*���zH�>7!/�����ԇ�VY�\E|�s�fR�	�&i�xj��~O�i���~���c� ��Ǐ
�*]b/�η�8��@�ڜ��!Y���=Ɏ�S�����=:��mow7��4]�_o^FŅ�xH��/��q��Y��s��r�l6? ��      M      x������ � �      F   �   x���;jC1��ZZ�70b^�T�v�p�Fѕ�T����N�s�V�<lG��:T�cw6�l��B]�(O��x��R�Y;�):v�n��~|����S8o׀��	��Ё�17�T�k�^�������8цdA�v�L*�:���%C�?	5�����ePcO,d���I��-s��؋5%�R����G�      K   m   x�u�1� �N������O���da�T%�/Sӥ�ӛ�����NIHm�)����W�#�F������mY��o���ϊp�9���癯f�.�l�:��~�?�]&n      J   �   x�}�1N1�z�s���m�qr
$�hh��������v�����?�s���<.�,X����a�αs��j7#�������<�\�cf:��K!OT�T�]�R�3��2�BU��{A/B��3�nNn�����2z�EV��0PG!j���t�wё���:����RH's:;�T+s6q�_g��T5�\��^]�����3�f�lz���.Õ@M�.���ݢ�m�[��A�9!�������2��C      B     x��U���8�����5�Ҍ3 !����D�����ޟ�R����.�k�{�{f[!!�#Y�K���j�z�")ʄӻ����}�ߞ>�����'��D��oqTVE������	h��׏3{/{/�ӡ�'�XQ2�Q����Xx�q!�7,kvfûX9[�=�ឤLF��aG.��v��b��8�J�w����(X5�biɰ����Y`!��MdE��vL�V/�Z�Iv�i�����a7`��+�hkC[%�{�U=�j�S�~DՓKn�u�@�3݂ٟ�BF"w(w�JtE�1�{�����#~܆������2Ro!lA؄6��HD�F��;�nh\V˞����S��Y����gT�H�휃�IG�ȓV6ѕ/��?5��@N���]v�uGN���=�F�(.�#1�(��r��a���?��}D�d�L�\7.��s�tz��t0Dՙ󮑨���"���H�1i6 >���ޣ�mdk�>��Mte���|��Qoٺ'D�$�{��Gګy�a����J<�ć�xUt�r� ow ��WMi�y��!Q��6Z���3-ؚй�~����y������x"#���
�g������f�K��G�����K���`�VG;�P_� [��Jh�l�R����{6t�A��� ���x� BN�^�@#���r�,����	��'���� ��S5�����ofp�.���=<�A`Ωh�*Pr��˃(
/<�VW\%$��D1��Ȑn&�M�,�?��i��������u      L      x������ � �     